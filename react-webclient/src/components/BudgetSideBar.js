import React from 'react';
import classNames from 'classnames';
import {moveItem} from '../data/BudgetItem';
import {find, debounce} from 'lodash';
import {monthName} from '../utils/helpers';
import {browserHistory,Link} from 'react-router';

import { Row, Col, Menu, Icon, DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
const SubMenu = Menu.SubMenu;

export default class BudgetSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.dropped = debounce(this.dropped, 100)
  }

  static propTypes = {
    budget: React.PropTypes.object.isRequired,
    moveBudgetItem: React.PropTypes.func.isRequired,
    currentCategoryId: React.PropTypes.number.isRequired,
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

  dropped = (newCategoryId, budgetItem, message) => {
    this.props.moveBudgetItem(newCategoryId, budgetItem)
    document.querySelector('a.item.active').focus()
    showMessage(message)
  }

  _moveDroppedItem = async (categoryId, budgetItem) => {
    try {
      const resp = await moveItem(categoryId, budgetItem.id);
      if (resp !== null) {
        this.dropped(categoryId, budgetItem, resp.message)
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  drop = (e) => {
    e.preventDefault();
    const categoryId         = parseInt(e.target.dataset.id);
    const originalCategoryId = parseInt(e.dataTransfer.getData('original_category_id'));

    if (categoryId !== originalCategoryId) {
      const budgetItem = find(this.props.budgetItems, {id: parseInt(e.dataTransfer.getData('budget_item_id'))});
      this._moveDroppedItem(categoryId, budgetItem);
    }
  }

  dragOver(e) {
    e.preventDefault()
    if (e.target.tagName === 'A') {
      var link = e.target
    } else {
      var link = e.target.parentElement
    }
    link.focus()
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
            <SubMenu key="sub1" title={<span><Icon type="calendar" /><span>{monthName(this.props.budget.month)} {this.props.budget.year}</span></span>}>
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
