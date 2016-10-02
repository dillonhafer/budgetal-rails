import React from 'react';
import {monthName, title}      from '../utils/helpers';
import {findCategory}          from '../data/BudgetCategory';
import BudgetSideBarContainer  from '../containers/BudgetSideBarContainer';
import BudgetCategoryContainer from '../containers/BudgetCategoryContainer';
import {find} from 'lodash';

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount = () => {
    const budgetParams = Object.assign({}, this.props.params, {id: this.props.id});
    this._fetchBudget(budgetParams);
  }

  findCurrentCategory(resp) {
    if (location.hash) {
      const hashCategory = location.hash.replace('#', '');
      return find(resp.budgetCategories, function(c) {
        return c.name.toLowerCase().replace('/', '-') === hashCategory;
      });
    } else {
      return resp.budget_category;
    }
  }

  _fetchBudget = async(data) => {
    try {
      this.setState({loading: true});
      const resp = await findCategory(data);
      if (resp !== null) {
        const currentCategory = this.findCurrentCategory(resp);
        this.props.updateCurrentCategory(currentCategory)
        this.props.updateBudget(resp)
        this.setState({loading: false});
        title(`${monthName(resp.budget.month)} ${resp.budget.year}`);
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  render() {
    return (
      <section className='budget-section'>
        <BudgetSideBarContainer />
        <BudgetCategoryContainer isLoading={this.state.loading} />
      </section>
    );
  }
}
