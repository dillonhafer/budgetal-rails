import React from 'react';
import {numberToCurrency} from '../../utils/helpers';
import moment from 'moment';
import {round} from 'lodash';

import {
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  Menu,
  Tag,
} from 'antd';
const CheckableTag = Tag.CheckableTag;


export default class AnnualBudgetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired
  };

  editItem = () => {
    this.props.handleOnCardClick(this.props.budgetItem);
  }

  deleteItem = () => {
    this.props.handleOnDeleteClick(this.props.budgetItem);
  }

  render() {
    const name   = this.props.budgetItem.name;
    const loading = this.props.budgetItem.loading;
    const amount = numberToCurrency(this.props.budgetItem.amount);
    const date   = moment(this.props.budgetItem.due_date).format('LL');
    const month  = numberToCurrency(round((this.props.budgetItem.amount / 12)));
    const color  = this.props.budgetItem.paid ? '#87d068' : '#cacaca';
   const menu = <Menu>
                  <Menu.Item>
                    <a className="primary-color" onClick={this.editItem}><Icon type="edit" /> Edit</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a className="alert-color" onClick={this.deleteItem}><Icon type="delete" /> Delete</a>
                  </Menu.Item>
                </Menu>
    return (
      <Col className="card" xs={24} sm={12} md={8} lg={6}>
        <Card loading={loading} title={name} extra={
            <div className="annual-item-crud">
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="ghost" shape="circle" icon="ellipsis" />
              </Dropdown>
            </div>
          }>
          <div className='text-center'>
            <p>
              In order to reach <b>{amount}</b><br />
              by <b>{date}</b><br />
              you need to save
              <br/><b>{month}/month</b><br />
            </p>
            <Tag color={color}>Paid</Tag>
          </div>
        </Card>
      </Col>
    );
  }
}
