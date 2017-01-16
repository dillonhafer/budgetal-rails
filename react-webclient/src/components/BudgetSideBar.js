import React from 'react';
import {find} from 'lodash';
import {budgetMonth} from '../utils/helpers';
import {browserHistory,Link} from 'react-router';

import { Row, Col, Menu, Icon, DatePicker } from 'antd';
const SubMenu = Menu.SubMenu;

export default class BudgetSideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budget: React.PropTypes.object.isRequired,
    currentCategoryName: React.PropTypes.number.isRequired,
  }

  handleOnChange = (date, dateString) => {
    browserHistory.push(`/budgets/${date.year()}/${date.month()+1}`);
  }

  handleOnClick = (item, key, keyPath) => {
    const cat = this.props.budget.budget_categories.find((cat) => {return cat.name === item.key});
    if (cat !== undefined) {
      const lowerName = cat.name.toLowerCase().replace('/', '-');
      window.location.hash = `#${lowerName}`
      this.props.changeCategory(cat);
    }
  }

  findDisabledDate(date) {
    const year = date.year();
    return (year < 2015 || year > 2018) ? true : false;
  }

  render() {
    return (
      <Col span={4}>
        <div className="icon-bar">
          <Menu theme="light"
                style={{ width: '100%' }}
                onClick={this.handleOnClick}
                selectedKeys={[this.props.currentCategoryName]}
                mode="inline">
            <SubMenu key="sub1" title={<span><Icon type="calendar" /><span>{budgetMonth(this.props.budget)}</span></span>}>
              <Menu.Item disabled={true} key='date'>
                <DatePicker.MonthPicker onChange={this.handleOnChange} disabledDate={this.findDisabledDate} cellContentRender={(date) => {return date}} />
              </Menu.Item>
            </SubMenu>
            <Menu.Divider key="divider1" />
              {
                this.props.budget.budget_categories.map((category) => {
                  const itemClass = category.name.toLowerCase().replace('/','-');
                  return (
                    <Menu.Item id={category.id} key={category.name}>
                      <span className={itemClass}>{category.name}</span>
                    </Menu.Item>
                  );
                })
              }
          </Menu>
        </div>
      </Col>
    )
  }
}
