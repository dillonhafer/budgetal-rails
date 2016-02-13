import React from 'react';
import CategoryList from './category-list';
import classNames from 'classnames';
import ItemForm from './item-form';
import {allPlans, find, createPlan, updatePlan} from '../../data/allocation_plan';
import {createItem, updateItem} from '../../data/allocation_plan_budget_item';
import {monthName, selectedValue, title, today, numberToCurrency, remainingClass} from '../../utils/helpers';
import AllocationPlanForm from './allocation-plan-form';
import Modal from '../../utils/modal';

export default class AllocationPlans extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener('scroll', this.handleScroll);
  }

  state = {
    showPlanForm: false,
    budget: {
      month: parseInt(this.props.params.month),
      year: parseInt(this.props.params.year),
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

  static contextTypes = {
    history: React.PropTypes.object.isRequired
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


  cancelDelete = (e) => {
    if (e) { e.preventDefault() }
    this.setState({modal: {hidden: true, index: -1, item: {name: ''}, delete: function(){}}});
  }

  incrementMonth(date, number) {
    const year     = date.getFullYear();
    const month    = date.getMonth();
    const newMonth = month + number;
    return new Date(year, newMonth);
  }

  changeMonth = (number) => {
    const currentDate = new Date(this.state.budget.year, this.state.budget.month-1, 1);
    const newDate = this.incrementMonth(currentDate, number);
    const date = {year: newDate.getFullYear(), month: newDate.getMonth() + 1}
    this.context.history.push(`/detailed-budgets/${date.year}/${date.month}`)
  }

  changeBudget = () => {
    const year  = selectedValue('#budget_year');
    const month = selectedValue('#budget_month');
    this.context.history.push(`/detailed-budgets/${year}/${month}`)
  }

  showPlaForm = (e) => {
    e.preventDefault();
    this.setState({showPlanForm: true});
  }

  componentDidMount = () => {
    this._fetchBudget(this.props.params);
  }

  _fetchDataDone = (data) => {
    this.setState({
      budget: data.budget,
      allocation_plan: data.allocation_plan || {item_groups: []}
    });
    title(`${monthName(data.budget.month)} ${data.budget.year} | Detailed Budgets`);
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
  }

  _fetchBudget = (data) => {
    allPlans(data)
      .then(this._fetchDataDone)
      .catch(this._fetchDataFail)
  }

  updateBudgetItem = (index, group, updatedItem) => {
    var allocation_plan = this.state.allocation_plan;
    var group_index     = _.findIndex(allocation_plan.item_groups, {name: group});
    allocation_plan.item_groups[group_index].budget_items[index] = updatedItem;
    this.setState({allocation_plan});
  }

  saveBudgetItem = (item) => {
    let data, strategy;
    if (item.id === '') {
      data = {
        budget_item_id: item.budget_item.id,
        allocation_plan_id: this.state.allocation_plan.id,
        amount_budgeted: item.amount_budgeted
      };
      strategy = createItem;
    } else {
      data = {
        id: item.id,
        allocation_plan_budget_item: {
          amount_budgeted: item.amount_budgeted
        }
      };
      strategy = updateItem;
    }

    strategy(data)
      .then((budget_item) => {
        if (!!budget_item.errors) {
          this._saveItemFail(item.budget_item, budget_item.errors);
        } else {
          this._budgetItemSaved(item.budget_item, budget_item);
        }
      })
      .catch(this._fetchDataFail)
  }

  _budgetItemSaved = (originalItem, updatedItem) => {
    var allocation_plan = this._updateBudgetItem(originalItem, updatedItem);
    this.setState({allocation_plan});
    showMessage(`Saved ${originalItem.name}`);
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

  _saveItemFail = (originalItem, errors) => {
    var allocation_plan = this.state.allocation_plan;
    var groupIndex      = _.findIndex(allocation_plan.item_groups, {category_id: originalItem.budget_category_id});
    var itemIndex       = _.findIndex(allocation_plan.item_groups[groupIndex].budget_items, {budget_item: {id: originalItem.id}});

    allocation_plan.item_groups[groupIndex].budget_items[itemIndex].errors = errors;
    this.setState({allocation_plan});
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
    this.setState({showPlanForm: true, modalPlan: {income: 0, start_date: today(), end_date: today()}});
  }

  changePlan = (plan, e) => {
    e.preventDefault();
    find(plan.id)
      .then((resp) => {
        this.setState({allocation_plan: resp.allocation_plan});
      })
      .catch(this._fetchDataFail)
  }

  cancelPlanModal = () => {
    this.setState({showPlanForm: false, modalPlan: {}});
  }

  updatePlan = (plan) => {
    const modalPlan = _.assign({}, this.state.modalPlan, plan);
    this.setState({modalPlan});
  }

  planSaved = (plan) => {
    let allocation_plan = _.assign({}, this.state.allocation_plan, plan);
    let budget = _.assign({}, this.state.budget);
    let idx    = _.findIndex(budget.allocation_plans, {id: plan.id});

    if (idx == -1) {
      budget.allocation_plans.push(plan);
    } else {
      budget.allocation_plans[idx] = plan;
    }

    this.setState({budget, allocation_plan});
    showMessage('Saved Plan');
    this.cancelPlanModal();
  }

  savePlan = (allocation_plan) => {
    let data = {allocation_plan};
    let strategy = createPlan;

    if (allocation_plan.id !== undefined) {
      data.id  = allocation_plan.id;
      strategy = updatePlan;
    }

    strategy(this.props.params, data)
      .then((resp) => {
        if (!resp.errors) {
          this.planSaved(resp);
        } else {
          this.updatePlan(resp)
        }
      })
      .catch(this._fetchDataFail)
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
    let dateString = 'No Date';
    if (plan.start_date && plan.end_date) {
      const start = this.dateParts(plan.start_date);
      const end   = this.dateParts(plan.end_date);
      dateString  = `${start.month}/${start.day} - ${end.month}/${end.day}`
    }
    return dateString;
  }

  render() {
    const planForm = <AllocationPlanForm plan={this.state.modalPlan} save={this.savePlan} update={this.updatePlan} />
    const allocation_plan = this.state.allocation_plan;
    const notAllocated = this.notAllocated(allocation_plan)
    const fixClasses = classNames('row collapse fixer hide-for-small', {'plan-fixer': this.state.fixer});
    return (
      <div>
        <section>
          <CategoryList budget={this.state.budget} categories={allocation_plan.item_groups} changeBudget={this.changeBudget} changeMonth={this.changeMonth} />
          <Modal title='Pay Period' hidden={this.state.showPlanForm} cancel={this.cancelPlanModal} content={planForm} modalType='blue' modalSize='tiny' />
          <div className='large-10 medium-10 columns hide-for-small-down'>
            <div>
              <dl className="tabs" data-tab>
                {
                  this.state.budget.allocation_plans.map((plan, index) => {
                    const ddClass = classNames({active: allocation_plan.id == plan.id})
                    return (
                      <dd key={index} className={ddClass}>
                        <a href="#" onClick={this.changePlan.bind(null, plan)}>{this.tabDate(plan)}</a>
                      </dd>
                    );
                  })
                }
                <dd className='new'>
                  <a href='#' onClick={this.addPlan} className='add-pay-period'><i className='fi-plus'></i></a>
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
