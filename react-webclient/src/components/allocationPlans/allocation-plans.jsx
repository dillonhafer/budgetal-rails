import React from 'react';
import classNames from 'classnames';
import AllocationPlanForm from './allocation-plan-form';
import BudgetSideBar from '../BudgetSideBar';
import PlanOverview from './PlanOverview';
import {browserHistory} from 'react-router';
import {createItem, updateItem} from '../../data/allocation_plan_budget_item';
import {
  allPlans,
  createPlan,
  updatePlan,
  deletePlan
} from '../../data/allocation_plan';
import {
  currency,
  monthName,
  remainingClass,
  title,
  today,
  numberStep,
} from '../../utils/helpers';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  InputNumber,
  Menu,
  Modal,
  Row,
  Table,
  Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;

export default class AllocationPlans extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener('scroll', this.handleScroll);
    this.state = {
      budget: {
        month: parseInt(this.props.params.month),
        year: parseInt(this.props.params.year),
        allocation_plans: []
      },
      showPlanForm: false,
      modalPlan: {},
      fixer: false,
      hideDeleteModal: true,
      currentPlan: "0",
      currentCategoryName: "Charity"
    }
  }

  menu() {
    return (
      <Menu>
        <Menu.Item>
          <a className="primary-color" onClick={this.editPlan}><Icon type="edit" /> Edit</a>
        </Menu.Item>
        <Menu.Item>
          <a className="alert-color" onClick={this.deletePlan}><Icon type="delete" /> Delete</a>
        </Menu.Item>
      </Menu>
    )
  }

  componentDidMount = () => {
    this._fetchBudget(this.props.params);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleOnChange = (date, dateString) => {
    browserHistory.push(`/detailed-budgets/${date.year()}/${date.month()+1}`);
  }

  handleScroll = (event) => {
    if (window.scrollY >= 80) {
      if (!this.state.fixer) {
        this.setState({fixer: true});
      }
    } else {
      this.setState({fixer: false});
    }
  }

  _fetchDataDone = (data) => {
    const {budget} = data;
    this.setState({
      budget: budget,
      currentPlan: budget.allocation_plans.length ? budget.allocation_plans[0].allocation_plan.id.toString() : undefined,
      allocation_plan: budget.allocation_plans.length ? budget.allocation_plans[0].allocation_plan : undefined
    });
    title(`${monthName(data.budget.month)} ${budget.year} | Detailed Budgets`);
  }

  _fetchDataFail = (e) => {
    showMessage(e)
    apiError(e.message)
  }

  _fetchBudget = (data) => {
    allPlans(data)
      .then(this._fetchDataDone)
      .catch(this._fetchDataFail)
  }

  updateBudgetItem = (index, group, updatedItem, newAmount) => {
    let allocation_plan = _.merge({}, this.state.allocation_plan);
    let group_index     = _.findIndex(allocation_plan.item_groups, {name: group});

    allocation_plan.item_groups[group_index].budget_items[index].amount_budgeted = newAmount;
    const idx = _.findIndex(this.state.budget.allocation_plans, (p) => {return p.allocation_plan.id === allocation_plan.id})
    let budget = this.state.budget;
    budget.allocation_plans[idx].allocation_plan = allocation_plan;

    this.setState({budget,allocation_plan});
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
    let allocation_plan = this._updateBudgetItem(originalItem, updatedItem);
    this.setState({allocation_plan});
    showMessage(`Saved ${originalItem.name}`);
  }

  _updateBudgetItem = (budgetItem, updatedItem) => {
    let allocation_plan = _.merge({}, this.state.allocation_plan);
    let groupIndex      = _.findIndex(allocation_plan.item_groups, {category_id: budgetItem.budget_category_id});
    let itemIndex       = _.findIndex(allocation_plan.item_groups[groupIndex].budget_items, {budget_item: {id: budgetItem.id}});
    let originalItem    = allocation_plan.item_groups[groupIndex].budget_items[itemIndex]

    let newItem = _.merge({}, originalItem, updatedItem)
    allocation_plan.item_groups[groupIndex].budget_items[itemIndex] = newItem;
    return allocation_plan;
  }

  _saveItemFail = (originalItem, errors) => {
    let allocation_plan = _.merge({}, this.state.allocation_plan);
    let groupIndex      = _.findIndex(allocation_plan.item_groups, {category_id: originalItem.budget_category_id});
    let itemIndex       = _.findIndex(allocation_plan.item_groups[groupIndex].budget_items, {budget_item: {id: originalItem.id}});

    allocation_plan.item_groups[groupIndex].budget_items[itemIndex].errors = errors;
    this.setState({allocation_plan});
  }

  nothing(showEmptyMessage) {
    if (showEmptyMessage) {
      return (
        <div className='text-center add-pay-period-button'>
          <p>You haven't added any pay periods yet.</p>
        </div>
      )
    }
  }

  editPlan = () => {
    const modalPlan = this.state.allocation_plan;
    this.setState({showPlanForm: true, modalPlan});
  }

  addPlan = () => {
    this.setState({showPlanForm: true, modalPlan: {income: 0, start_date: today(), end_date: today()}});
  }

  cancelPlanModal = () => {
    this.setState({showPlanForm: false});
  }

  updateModalPlan = (plan) => {
    const modalPlan = _.merge({}, this.state.modalPlan, plan);
    this.setState({modalPlan});
  }

  planSaved = (plan) => {
    let allocation_plan = _.merge({}, this.state.allocation_plan, plan);
    let budget = _.merge({}, this.state.budget);
    let idx    = _.findIndex(budget.allocation_plans, (p) => {return p.allocation_plan.id === plan.id});

    if (idx == -1) {
      budget.allocation_plans.push({allocation_plan});
    } else {
      budget.allocation_plans[idx] = {allocation_plan: plan};
    }

    this.setState({budget, allocation_plan, currentPlan: allocation_plan.id.toString()});
    showMessage('Saved Pay Period');
    this.cancelPlanModal();
  }

  savePlan = () => {
    let data = {allocation_plan: _.merge({}, this.state.modalPlan)};
    let strategy = createPlan;

    if (data.allocation_plan.id !== undefined) {
      data.id  = data.allocation_plan.id;
      strategy = updatePlan;
    }

    strategy(this.props.params, data)
      .then((resp) => {
        if (!resp.errors) {
          this.planSaved(resp.allocation_plan);
        } else {
          this.updateModalPlan(resp.allocation_plan)
        }
      })
      .catch(this._fetchDataFail)
  }

  deletePlan = async() => {
    try {
      const id = this.state.allocation_plan.id
      const resp = await deletePlan(id);

      if (resp.success) {
        const planIdx = _.findIndex(this.state.budget.allocation_plans, {id: id});
        const allocation_plans = _.merge({}, {}, this.state.budget.allocation_plans.splice(planIdx,1));
        const budget  = _.merge({}, this.state.budget, allocation_plans);

        let allocation_plan = undefined;
        if (budget.allocation_plans.length) {
          allocation_plan = budget.allocation_plans[0].allocation_plan;
          this.handleChange(allocation_plan.id.toString());
        }

        this.setState({modalPlan: {}, budget, allocation_plan})
      }
      showMessage(resp.message);
      this.cancelDelete();
    } catch(err) {
      apiError(err);
    }
  }

  cancelDelete = () => {
    this.setState({hideDeleteModal: true});
  }

  dateParts(dateString) {
    var parts = dateString.split('-');
    return {year: parts[0], month: parts[1], day: parts[2]}
  }

  hidePlan() {
    return !this.state.allocation_plan.id;
  }

  categories() {
    return [
      {id: 1, name: "Charity"},
      {id: 2, name: "Saving"},
      {id: 3, name: "Housing"},
      {id: 4, name: "Utilities"},
      {id: 5, name: "Food"},
      {id: 6, name: "Clothing"},
      {id: 7, name: "Transportation"},
      {id: 8, name: "Medical/Health"},
      {id: 9, name: "Insurance"},
      {id: 10, name: "Personal"},
      {id: 11, name: "Recreation"},
      {id: 12, name: "Debts"}
    ]
  }

  changeCategory = (category) => {
    this.setState({currentCategoryName: category.name});
  }

  handleChange = (currentPlan) => {
    const allocation_plan = _.find(this.state.budget.allocation_plans, (p) => {return p.allocation_plan.id === parseInt(currentPlan)}).allocation_plan;
    this.setState({currentPlan, allocation_plan});
  }

  render() {
    const {budget, allocation_plan} = this.state;
    const showEmptyMessage = budget.allocation_plans.length === 0;
    const budgetDate = {year: budget.year, month: budget.month};
    return (
      <Row>
        <BudgetSideBar
          budget={budgetDate}
          budgetCategories={this.categories()}
          handleOnChange={this.handleOnChange}
          changeCategory={this.changeCategory}
          currentCategoryName={this.state.currentCategoryName} />
        <Col span={20}>
          <Row>
            <Col span={16}>
              <div className='budget-category-row'>
                <div className="body-row">
                  <Tabs hideAdd
                        onChange={this.handleChange}
                        activeKey={this.state.currentPlan}
                        tabBarExtraContent={
                          <Button type="primary" onClick={this.addPlan}><Icon type="plus-circle"/>New Pay Period</Button>
                        }>
                    {
                      budget.allocation_plans.map((_plan,key) => {
                        const plan = _plan.allocation_plan;
                        return (
                          <TabPane tab={plan.tab_date} key={plan.id}>
                            {
                              plan.item_groups.map((group, index) => {
                                const data = group.budget_items.map((i,k) => {
                                  const total     = parseFloat(i.other_allocated) + parseFloat(i.amount_budgeted);
                                  const remaining =  _.round(parseFloat(i.budget_item.amount) - total, 2)
                                  return {
                                    key: String(k),
                                    name: i.budget_item.name,
                                    budgeted: <InputNumber onChange={this.updateBudgetItem.bind(this,k,group.name,i)} value={i.amount_budgeted} />,
                                    remaining: currency(remaining),
                                    action: <Button type="primary" onClick={this.saveBudgetItem.bind(this,i)}>Save</Button>
                                  }
                                });

                                const columns = [
                                  {title: '',          dataIndex: 'name', key: 'name'},
                                  {title: 'Budgeted',  dataIndex: 'budgeted', key: 'budgeted'},
                                  {title: 'Remaining', dataIndex: 'remaining', key: 'remaining'},
                                  {title: '',          dataIndex: 'action', key: 'action'}
                                ];

                                return (
                                  <div
                                    key={`group-${group.name}-${plan.id}`}
                                    id={group.name.toLowerCase().replace('/','-')}>
                                    <Card title={group.name}>
                                      <Table pagination={false} bordered dataSource={data} columns={columns} />
                                    </Card>
                                    <br />
                                  </div>
                                )
                              })
                            }
                          </TabPane>
                        )
                      })
                    }
                  </Tabs>
                  {this.nothing(showEmptyMessage)}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <PlanOverview plan={allocation_plan} fixed={this.state.fixer} menu={this.menu()} />
              <Modal title="Pay Period"
                     width={300}
                     className="no-modal-footer"
                     visible={this.state.showPlanForm}
                     onCancel={this.cancelPlanModal}>
                <AllocationPlanForm plan={this.state.modalPlan} save={this.savePlan} update={this.updateModalPlan} />
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
