import React from 'react';
import CategoryList from './category-list';
import classNames from 'classnames';
import ItemForm from './item-form';
import {allPlans, find, createPlan, updatePlan} from '../../data/allocation_plan';
import {createItem, updateItem} from '../../data/allocation_plan_budget_item';
import {monthName, selectedValue, title, today, numberToCurrency, remainingClass} from '../../utils/helpers';
import AllocationPlanModal from './allocation-plan-modal';


export default class AllocationPlans extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener('scroll', this.handleScroll);
  }

  state = {
    showPlanForm: false,
    budget: {
      month: this.urlParams().month,
      year: this.urlParams().year,
      allocation_plans: [
      ]
    },
    allocation_plan: {
      id: 0,
      start_date: today(),
      end_date: today(),
      tab_date: '-',
      income: 0.00,
      item_groups: []
    },
    fixer: false,
    modalPlan: {}
  }

  confirmItemDelete = (budget_item, index) => {
    if (!!budget_item.id) {
      this.setState({
        modal: {
          hidden: false,
          item: budget_item,
          index: index,
          delete: this.deleteBudgetItem
        }
      });
    } else {
      this._budgetItemDeleted(index)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.scrollY >= 122) {
      if (!this.state.fixer) {
        this.setState({fixer: true});
      }
    } else {
      this.setState({fixer: false});
    }
  }

  confirmExpenseDelete = (expense, index) => {
    if (!!expense.id) {
      this.setState({
        modal: {
          hidden: false,
          item: expense,
          index: index,
          delete: this.deleteExpense
        }
      });
    } else {
      this._expenseDeleted(expense.budget_item_id, index)
    }
  }

  cancelDelete = (e) => {
    if (e) { e.preventDefault() }
    this.setState({modal: {hidden: true, index: -1, item: {name: ''}, delete: function(){}}});
  }

  urlParams() {
    var pathNames  = window.location.pathname.split('/');
    var yearIndex  = pathNames.length - 2;
    var monthIndex = pathNames.length - 1;
    return {month: parseInt(pathNames[monthIndex]), year: parseInt(pathNames[yearIndex])};
  }

  incrementMonth(date, number) {
    var year     = date.getFullYear();
    var month    = date.getMonth();
    var newMonth = month + number;
    return new Date(year, newMonth);
  }

  changeMonth = (number) => {
    var currentDate = new Date(this.state.budget.year, this.state.budget.month-1, 1);
    var newDate = this.incrementMonth(currentDate, number);
    this._fetchBudget({year: newDate.getFullYear(), month: newDate.getMonth() + 1});
  }

  changeBudget = () => {
    var year  = selectedValue('#budget_year');
    var month = selectedValue('#budget_month');

    this._fetchBudget({year: year, month: month});
  }

  showPlaForm = (e) => {
    e.preventDefault();
    this.setState({showPlanForm: true});
  }

  componentDidMount = () => {
    this._fetchBudget(this.urlParams());
  }

  _fetchDataDone = (data) => {
    this.setState({
      budget: data.budget,
      allocation_plan: data.allocation_plan || {item_groups: []}
    });
    history.pushState({}, 'Budgetal', `/allocation-plans/${data.budget.year}/${data.budget.month}`);
    title(`${monthName(data.budget.month)} ${data.budget.year} | Allocated Spending Plans`);
  }

  _fetchDataFail(message) {
    showMessage(message);
  }

  changeCategory = (id) => {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  }

  _fetchBudget = (data) => {
    var self = this;
    allPlans(data)
      .then((resp) => {
        if (!!resp.errors) {
          self._fetchDataFail(resp.errors);
        } else {
          self._fetchDataDone(resp);
        }
      });
  }

  // Budget Item functions
  saveBudgetItem = (item) => {
    var self = this;
    if (item.id == '') {
      var data = {
        budget_item_id: item.budget_item.id,
        allocation_plan_id: this.state.allocation_plan.id,
        amount_budgeted: item.amount_budgeted
      }
      createItem(data)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            self._saveItemFail(item.budget_item, budget_item.errors);
          } else {
            self._budgetItemSaved(item.budget_item, budget_item);
          }
        });
    } else {
      var data = {
        id: item.id,
        allocation_plan_budget_item: {
          amount_budgeted: item.amount_budgeted
        }
      }
      updateItem(data)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            self._saveItemFail(item.budget_item, budget_item.errors);
          } else {
            self._budgetItemSaved(item.budget_item, budget_item);
          }
        });
    }
  }

  _updateBudgetItem = (budgetItem, updatedItem) => {
    var allocation_plan = this.state.allocation_plan;
    var groupIndex      = _.findIndex(allocation_plan.item_groups, {category_id: budgetItem.budget_category_id});
    var itemIndex       = _.findIndex(allocation_plan.item_groups[groupIndex].budget_items, {budget_item: {id: budgetItem.id}});
    var originalItem    = allocation_plan.item_groups[groupIndex].budget_items[itemIndex]

    var newItem = _.merge({}, originalItem, updatedItem)
    allocation_plan.item_groups[groupIndex].budget_items[itemIndex] = newItem;
    return allocation_plan;
  }

  _budgetItemSaved = (originalItem, updatedItem) => {
    var allocation_plan = this._updateBudgetItem(originalItem, updatedItem);
    this.setState({allocation_plan});
    showMessage(`Saved ${originalItem.name}`);
  }

  _saveItemFail = (originalItem, errors) => {
    var allocation_plan = this.state.allocation_plan;
    var groupIndex      = _.findIndex(allocation_plan.item_groups, {category_id: originalItem.budget_category_id});
    var itemIndex       = _.findIndex(allocation_plan.item_groups[groupIndex].budget_items, {budget_item: {id: originalItem.id}});

    allocation_plan.item_groups[groupIndex].budget_items[itemIndex].errors = errors;
    this.setState({allocation_plan});
  }

  deleteBudgetItem = (e) => {
    e.preventDefault();
    var modal = this.state.modal;
    var self = this;

    if (modal.item.id !== undefined) {
      destroyItem(modal.item.id)
        .then((resp) => {
          if (resp.success) {
            self._budgetItemDeleted(modal.index);
          } else {
            self._fetchDataFail(resp.message);
          }
        });
    }
  }

  _budgetItemDeleted = (index) => {
    let category = this.state.category
    category.budget_items.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  }

  addBudgetItem = (e) => {
    e.preventDefault()
    var category = this.state.category
    category.budget_items.push({category_id: category.id, amount_budgeted: 0.01})
    this.setState({category: category})
  }

  updateBudgetItem = (index, group, updatedItem) => {
    var allocation_plan = this.state.allocation_plan;
    var group_index     = _.findIndex(allocation_plan.item_groups, {name: group});
    allocation_plan.item_groups[group_index].budget_items[index] = updatedItem;
    this.setState({allocation_plan});
  }

  saveBudget = (budget) => {
    var self = this;
    updateBudget(budget)
      .then((resp) => {
        if (!!resp.errors) {
          self._saveBudgetFail(budget, resp.errors);
        } else {
          self._budgetUpdated(resp.budget);
        }
      });
  }

  _saveBudgetFail = (budget, errors) => {
    budget.errors = errors;
    this.setState({budget});
  }

  _budgetUpdated = (budget) => {
    showMessage('Updated Budget');
    this.setState({budget});
  }

  // Budget Item Expense functions
  addExpense = (id) => {
    var category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': id})[0]
    budget_item.budget_item_expenses.push({budget_item_id: id, amount: 0.01, date: today()})
    this.setState({category: category})
  }

  saveExpense = (expense) => {
    var self = this;
    if (expense.id === undefined) {
      createExpense(expense)
        .then((resp) => {
          if (!!resp.errors) {
            self._saveExpenseFail(expense.index, resp.errors);
          } else {
            self._expenseSaved(expense.index, resp);
          }
        });
    } else {
      updateExpense(expense)
        .then((resp) => {
          if (!!resp.errors) {
            self._saveExpenseFail(expense.index, resp.errors);
          } else {
            self._expenseSaved(expense.index, resp);
          }
        });
    }
  }

  _saveExpenseFail = (index, errors) => {
    let category = this.state.category
    let budget_item = _.where(category.budget_items, {'id': index.budget_item_id})[0]
    _.where(budget_item.budget_item_expenses, {'index': index.index})[0].errors = errors
    this.setState({category: category})
  }

  _expenseSaved = (index, expense) => {
    let category = this.state.category
    let budget = _.assign({}, this.state.budget, expense.budget)
    var budget_item = _.where(category.budget_items, {'id': expense.budget_item_id})[0]

    budget_item.budget_item_expenses[index] = expense
    this.setState({category: category, budget: budget})
    showMessage(`Saved ${expense.name}`)
  }

  deleteExpense = (e) => {
    e.preventDefault();
    var modal = this.state.modal;
    var self = this;

    if (modal.item.id !== undefined) {
      destroyExpense(modal.item.id)
        .then((resp) => {
          if (resp.success) {
            self._expenseDeleted(modal.item.budget_item_id, modal.index);
          } else {
            self._fetchDataFail(resp.message);
          }
        });
    }
  }

  _expenseDeleted = (budget_item_id, index) => {
    let category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': budget_item_id})[0]
    budget_item.budget_item_expenses.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  }

  itemFunctions() {
    return {
      save: this.saveBudgetItem,
      update: this.updateBudgetItem
    }
  }

  expenseFunctions() {
    return {
      add: this.addExpense,
      save: this.saveExpense,
      update: this.updateExpense,
      delete: this.confirmExpenseDelete
    }
  }

  _import = (e) => {
    e.preventDefault();
    var self = this;
    importCategory(this.state.category.id)
      .then((resp) => {
        self.importFinished(resp.imported, resp.message);
      });
  }

  importFinished = (imported_items, message) => {
    var category = this.state.category
    category.budget_items = category.budget_items.concat(imported_items)
    this.setState({category: category})
    showMessage(message)
    this.cancelImport()
  }

  cancelImport = (e) => {
    if (e) { e.preventDefault() }
    this.setState({importHidden: true});
  }

  openImport = (e) => {
    e.preventDefault()
    this.setState({importHidden: false});
  }

  nothing() {
    if (!this.state.allocation_plan.item_groups.length) {
      return (
        <p className='text-center add-pay-period'>
          <br />
          <br />
          <br />
          You haven't added any pay periods yet.<br />
          <br />
          <a href='#' onClick={this.addPlan} className='tiny success button radius add-pay-period'><i className='fi-plus'></i> New Pay Period</a>
        </p>
      )
    }
  }

  editPlan = () => {
    this.setState({showPlanForm: true, modalPlan: this.state.allocation_plan});
  }

  addPlan = () => {
    this.setState({showPlanForm: true, modalPlan: {start_date: today(), end_date: today()}});
  }

  changePlan = (plan, e) => {
    e.preventDefault();
    var self = this;
    find(plan.id)
      .then((resp) => {
        self.setState({allocation_plan: resp.allocation_plan});
      })
  }

  cancelPlanModal = () => {
    this.setState({showPlanForm: false, modalPlan: {}});
  }

  updatePlan = (plan) => {
    var modalPlan = _.assign({}, this.state.modalPlan, plan);
    this.setState({modalPlan});
  }

  planSaved = (plan) => {
    var allocation_plan = _.assign({}, this.state.allocation_plan, plan);
    var budget = this.state.budget;
    var idx    = _.findIndex(budget.allocation_plans, {id: plan.id});

    if (idx == -1) {
      budget.allocation_plans.push(plan);
    } else {
      budget.allocation_plans[idx] = plan;
    }

    this.setState({budget, allocation_plan});
    showMessage('Saved Plan');
    this.cancelPlanModal();
  }

  savePlan = (e) => {
    e.preventDefault();
    var self = this;
    var allocation_plan = this.state.modalPlan;
    var dateParams = this.urlParams();

    if (allocation_plan.id) {
      var data = {allocation_plan, id: allocation_plan.id};
      updatePlan(dateParams, data)
        .then((resp) => {
          self.updatePlan(resp);
          if (!resp.errors) {
            self.planSaved(resp);
          }
        });
    } else {
      var data = {allocation_plan};
      createPlan(dateParams, data)
        .then((resp) => {
          self.updatePlan(resp);
          if (!resp.errors) {
            self.planSaved(resp);
          }
        });
    }
  }

  notAllocated(allocation_plan) {
    var items = _.flatten(allocation_plan.item_groups.map((group) => {
                  return group.budget_items
                }))
    var allocated = _.reduce(items, function(total, item) {
                         return total + parseFloat(item.amount_budgeted);
                       }, 0.00);
    return _.round((allocation_plan.income - allocated), 2);
  }

  dateParts(dateString) {
    var parts = dateString.split('-');
    return {year: parts[0], month: parts[1], day: parts[2]}
  }

  tabDate(plan) {
    var dateString = 'No Date';
    if (plan.start_date && plan.end_date) {
      var start = this.dateParts(plan.start_date);
      var end   = this.dateParts(plan.end_date);
      var dateString = `${start.month}/${start.day} - ${end.month}/${end.day}`
    }
    return dateString;
  }

  render() {
    var self = this;
    var allocation_plan = this.state.allocation_plan;
    var notAllocated = this.notAllocated(allocation_plan)
    var fixClasses = classNames('row collapse fixer hide-for-small', {'plan-fixer': this.state.fixer});
    return (
      <div>
        <section>
          <CategoryList budget={this.state.budget} categories={allocation_plan.item_groups} changeBudget={this.changeBudget} changeMonth={this.changeMonth} />
          <AllocationPlanModal plan={this.state.modalPlan} save={this.savePlan} hidden={this.state.showPlanForm} update={this.updatePlan} cancel={this.cancelPlanModal} />
          <div className='large-10 medium-10 columns hide-for-small-down'>
            <div>
              <dl className="tabs" data-tab>
                {
                  this.state.budget.allocation_plans.map((plan, index) => {
                    var ddClass = classNames({active: allocation_plan.id == plan.id})
                    return (
                      <dd key={index} className={ddClass}>
                        <a href="#" onClick={self.changePlan.bind(null, plan)}>{self.tabDate(plan)}</a>
                      </dd>
                    );
                  })
                }
                <dd className='new'>
                  <a href='#' onClick={self.addPlan} className='add-pay-period'><i className='fi-plus'></i></a>
                </dd>
              </dl>

              <div className="tabs-content">
                <div className="content active" id={`panel-${allocation_plan.id}`}>
                  <div className="large-8 medium-8 columns">
                    {this.nothing()}
                    {
                      this.state.allocation_plan.item_groups.map((group, index) => {
                        return (
                          <div key={index} id={group.name.toLowerCase().replace('/','-')} className='row collapse'>
                            <div className='large-12 medium-12 columns header-row'>
                              <h3>{group.name}</h3>
                            </div>

                            <div className="small-12 large-12 medium-12 columns">
                              <ul className="main-budget-categories">
                                <li>
                                  <div className="row">
                                    <div className="large-2 medium-2 large-offset medium-offset-4 columns">
                                      Budgeted
                                    </div>
                                    <div className="large-6 medium-6 columns">
                                      Remaining
                                    </div>
                                    <div className="large-4 medium-4 columns"></div>
                                  </div>
                                  <br />
                                  {
                                    group.budget_items.map((item, index) => {
                                      return (
                                        <ItemForm index={index} key={index} group={group.name} item={item} save={this.saveBudgetItem} update={this.updateBudgetItem} />
                                      );
                                    })
                                  }
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                  <div className='large-4 medium-4 columns'>
                    <div className={fixClasses}>
                      <div className='large-12 medium-12 columns header-row'>
                        <h3>{this.tabDate(allocation_plan)}
                          <span className='right'>
                            <a href='#' onClick={this.editPlan}><i className='fi-pencil'></i></a>
                          </span>
                        </h3>
                      </div>
                      <div className="small-12 large-12 medium-12 columns">
                        <ul className="main-budget-categories">
                          <li>
                            <b>Pay Period Income:</b><br />
                            <span className='green pay-period-income'>{numberToCurrency(allocation_plan.income)}</span>
                            <br />
                            <b>Amount Not Allocated:</b><br />
                            <span className={remainingClass(notAllocated)}>{numberToCurrency(notAllocated)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='row'></div>
      </div>
    );
  }
}