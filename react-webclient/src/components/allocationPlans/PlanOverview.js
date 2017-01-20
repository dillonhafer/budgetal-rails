import React from 'react';
import classNames from 'classnames';
import {currency,remainingClass} from '../../utils/helpers';
import {
  flatten,
  reduce,
  round,
} from 'lodash';
import {
  Button,
  Dropdown,
} from 'antd';

export default class PlanOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    plan: React.PropTypes.object,
    fixed: React.PropTypes.bool.isRequired,
    menu: React.PropTypes.object.isRequired,
  }

  notAllocated(plan) {
    const items = flatten(plan.item_groups.map((group) => {
                    return group.budget_items
                  }));
    const allocated = reduce(items, (total, item) => {
                        return total + parseFloat(item.amount_budgeted);
                      }, 0.00);
    return round((plan.income - allocated), 2);
  }

  render() {
    const {plan,fixed,menu} = this.props;

    if (plan === undefined || plan.id === undefined) {
      return null
    }

    const fixClasses = classNames('budget-category-row', {'plan-fixer': fixed});
    const heading = plan.tab_date.replace("to", " - ");
    const notAllocated = this.notAllocated(plan);
    return (
      <div className={fixClasses}>
        <div className='header-row'>
          <h3>
            {heading}
            <div className="right">
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="ghost" shape="circle" icon="ellipsis" />
              </Dropdown>
            </div>
          </h3>
        </div>
        <div className="body-row">
          <b>Pay Period Income:</b><br />
          <span className='green pay-period-income'>{currency(plan.income)}</span>
          <br />
          <b>Amount Not Allocated:</b><br />
          <span className={remainingClass(notAllocated)}>{currency(notAllocated)}</span>
        </div>
      </div>
    )
  }
}
