import React from 'react';
import {numberToCurrency} from '../../utils/helpers';
import moment from 'moment';
import {round,times} from 'lodash';

import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  Table,
  Menu,
  Modal,
  Tag,
} from 'antd';
const CheckableTag = Tag.CheckableTag;

export default class AnnualBudgetItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
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

  showProgress = () => {
    this.setState({showProgress: true});
  }

  hideProgress = () => {
    this.setState({showProgress: false});
  }

  getProgressModal(item, visible) {
    const startDate = moment(item.due_date).subtract((item.payment_intervals+1), "months");
    const month   = round((item.amount / item.payment_intervals));
    const title   = `Accumulation Progress for ${item.name}`;
    const dataSource = times(item.payment_intervals, (key) => {
      const date = startDate.add(1, "months").format("LL");
      const badgeStatus = moment().diff(startDate) > 0 ? "success" : "error";
      return {
        key: key,
        date: <span><Badge status={badgeStatus} /> {date}</span>,
        amount: numberToCurrency(month * (key+1))
      }
    });

    const columns = ['Date', 'Amount'].map(title => {
      return {
        title,
        key: title.toLowerCase(),
        dataIndex: title.toLowerCase()
      }
    });

    return (
      <Modal title={title} visible={visible} footer={null} onCancel={this.hideProgress}>
        <Table dataSource={dataSource} pagination={false} size="small" columns={columns} bordered />
      </Modal>
    );
  }

  getMenu() {
    return (
      <Menu>
        <Menu.Item>
          <a className="primary-color" onClick={this.showProgress}><Icon type="area-chart" /> Progress</a>
        </Menu.Item>
        <Menu.Item>
          <a className="primary-color" onClick={this.editItem}><Icon type="edit" /> Edit</a>
        </Menu.Item>
        <Menu.Item>
          <a className="alert-color" onClick={this.deleteItem}><Icon type="delete" /> Delete</a>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const item    = this.props.budgetItem;
    const name    = item.name;
    const loading = item.loading;
    const amount  = numberToCurrency(item.amount);
    const date    = moment(item.due_date).format('LL');
    const month   = numberToCurrency(round((item.amount / item.payment_intervals)));
    const color   = item.paid ? '#87d068' : '#cacaca';
    const menu    = this.getMenu();
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

          {this.getProgressModal(item, this.state.showProgress)}
        </Card>
      </Col>
    );
  }
}
