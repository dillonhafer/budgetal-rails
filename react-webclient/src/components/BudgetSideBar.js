import React from 'react';
import {find} from 'lodash';
import {budgetMonth} from '../utils/helpers';
import {Link} from 'react-router';
import ImportExpenseModal from './ImportExpenseModal';

import { Row, Col, Menu, Icon, DatePicker } from 'antd';
const SubMenu = Menu.SubMenu;

export default class BudgetSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImportExpenseModal: false
    };
  }

  static propTypes = {
    budget: React.PropTypes.object.isRequired,
    budgetCategories: React.PropTypes.array.isRequired,
    currentCategoryName: React.PropTypes.string.isRequired,
    handleOnChange: React.PropTypes.func.isRequired,
    changeCategory: React.PropTypes.func.isRequired,
  }

  handleOnClick = (item, key, keyPath) => {
    if (item.key === "import-csv") {
      this.setState({showImportExpenseModal: true});
    } else {
      const cat = this.props.budgetCategories.find((cat) => {return cat.name === item.key});
      if (cat !== undefined) {
        const lowerName = cat.name.toLowerCase().replace('/', '-');
        window.location.hash = `#${lowerName}`
        this.props.changeCategory(cat);
      }
    }
  }

  findDisabledDate(date) {
    const year = date.year();
    return year < 2015 || year > 2018;
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
                <DatePicker.MonthPicker onChange={this.props.handleOnChange} disabledDate={this.findDisabledDate} cellContentRender={(date) => {return date}} />
              </Menu.Item>
            </SubMenu>
            <Menu.Divider key="divider1" />
              {
                this.props.budgetCategories.map((category) => {
                  const itemClass = category.name.toLowerCase().replace('/','-');
                  return (
                    <Menu.Item id={category.id} key={category.name}>
                      <span className={itemClass}>{category.name}</span>
                    </Menu.Item>
                  );
                })
              }
            <Menu.Divider key="divider2" />
            <Menu.Item id={'import-csv'} key={'import-csv'}>
              <span className={'import-csv'}>Import Expenses</span>
            </Menu.Item>
          </Menu>
          <ImportExpenseModal hidden={this.state.showImportExpenseModal} cancel={()=> this.setState({showImportExpenseModal: false})} />
        </div>
      </Col>
    )
  }
}
