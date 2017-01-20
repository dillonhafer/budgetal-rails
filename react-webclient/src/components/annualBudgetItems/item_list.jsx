import React from 'react';
import AnnualBudgetItem from './item';
import _ from 'lodash';

import {
  Badge,
  Button,
  Card,
  Col,
  Row,
} from 'antd';

export default class AnnualBudgetItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    annualBudgetItems: React.PropTypes.array.isRequired
  }

  budgetItems(items) {
    if (_.isEmpty(items)) {
      return <p className='text-center'>You haven't added any budget items yet.</p>;
    } else {
      return this.buildList(items);
    }
  }

  buildList = (budgetItems) => {
    return (budgetItems.map((budgetItem, index) => {
      return (
        <AnnualBudgetItem handleOnDeleteClick={this.props.handleOnDeleteClick}
                          handleOnCardClick={this.props.handleOnCardClick}
                          budgetItem={budgetItem}
                          key={index} />
      )
    }))
  }

  render() {
    return (
      <Row className='card-grid'>
        {this.budgetItems(this.props.annualBudgetItems)}
        <Col className="card text-center" span="6">
          <Button type="primary" icon="plus-circle" className="add-item-button" onClick={this.props.onClick} size="large">Add an Item</Button>
        </Col>
      </Row>
    );
  }
}
