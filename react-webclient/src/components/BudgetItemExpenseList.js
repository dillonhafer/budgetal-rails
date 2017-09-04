import React from 'react';
import { map, groupBy, orderBy } from 'lodash';
import { monthName } from '../utils/helpers';
import {
  ActionCell,
  AmountCell,
  DateCell,
  NameCell,
} from '../containers/BudgetItemExpenseContainer';

import { find } from 'lodash';
import classNames from 'classnames';
import { Button, Popconfirm, Table } from 'antd';
import moment from 'moment';

export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static propTypes = {
    expenses: React.PropTypes.array.isRequired,
    budgetItemId: React.PropTypes.number.isRequired,
  };

  newExpenseHandler = e => {
    e.preventDefault();
    this.props.newBudgetItemExpense(this.props.budgetItemId);
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  addExpenseLink(expenses, newFunction) {
    const disabled =
      find(expenses, expense => expense.id === undefined) !== undefined;
    return (
      <Button
        icon="plus-circle"
        onClick={newFunction}
        type="primary"
        disabled={disabled}
      >
        Add an Expense
      </Button>
    );
  }

  emptyCell = {
    children: <div />,
    props: { colSpan: 0 },
  };

  columns = [
    {
      title: 'Date',
      dataIndex: 'expense',
      key: 'date',
      className: 'expense-row',
      render: expense => {
        if (expense.name === 'date-group') {
          return {
            children: (
              <h4>
                {expense.date}
              </h4>
            ),
            props: {
              colSpan: 24,
            },
          };
        } else {
          return <DateCell expense={expense} />;
        }
      },
    },
    {
      title: 'Name',
      dataIndex: 'expense',
      key: 'name',
      render: expense => {
        if (expense.name === 'date-group') {
          return this.emptyCell;
        } else {
          return (
            <NameCell
              expense={expense}
              loading={this.state.loading}
              toggleLoading={this.toggleLoading}
            />
          );
        }
      },
    },
    {
      title: 'Amount',
      dataIndex: 'expense',
      key: 'amount',
      render: expense => {
        if (expense.name === 'date-group') {
          return this.emptyCell;
        } else {
          return (
            <AmountCell
              expense={expense}
              loading={this.state.loading}
              toggleLoading={this.toggleLoading}
            />
          );
        }
      },
    },
    {
      title: '',
      dataIndex: 'expense',
      key: 'actions',
      render: expense => {
        if (expense.name === 'date-group') {
          return this.emptyCell;
        } else {
          return (
            <ActionCell
              expense={expense}
              loading={this.state.loading}
              toggleLoading={this.toggleLoading}
            />
          );
        }
      },
    },
  ];

  render() {
    const sections = groupBy(
      orderBy(this.props.expenses, 'date', 'desc'),
      'date'
    );
    let dataSource = [];
    Object.keys(sections).map(section => {
      const date = moment(section, 'YYYY-MM-DD').format('dddd - MMM DD, YYYY');
      dataSource.push({ expense: { name: 'date-group', date }, key: section });

      sections[section].map(expense => {
        dataSource.push({ expense, key: `expense-${expense.id}` });
      });
    });

    return (
      <div>
        <hr />
        {this.addExpenseLink(this.props.expenses, this.newExpenseHandler)}
        <br />
        <br />
        <Table
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            pageSizeOptions: ['10', '25', '50'],
            showSizeChanger: true,
          }}
          size="small"
          title={() => `Expenses for ${this.props.budgetItem.name}`}
          bordered
          locale={{ emptyText: "You haven't added any expenses yet" }}
          columns={this.columns}
        />
      </div>
    );
  }
}
