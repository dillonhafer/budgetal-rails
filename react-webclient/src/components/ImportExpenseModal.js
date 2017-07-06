import React from 'react';
import classNames from 'classnames';
import {numberToCurrency, prettyServerErrors} from '../utils/helpers';
import {createExpense} from '../data/BudgetItemExpense';
import {findIndex} from 'lodash';
import moment from 'moment';
import {
  Progress,
  Modal,
  Button,
  Select,
  Icon,
  Table,
  Row,
  Col,
} from 'antd';
import Papa from 'papaparse';

class AddExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      itemId: "",
    }
  }

  disabled = () => {
    return (this.state.itemId === "" || this.state.categoryId === "");
  }

  formatExpense = () => {
    return {
      budget_item_id: parseInt(this.state.itemId),
      amount: this.props.expense[this.props.headers.amount].replace("-", ""),
      date: moment(this.props.expense[this.props.headers.date], "MM-DD-YYYY").format("YYYY-MM-DD"),
      name: this.props.expense[this.props.headers.name].replace(/\s+/g, ' ').trim(),
    }
  }

  save = async() => {
    if (!this.disabled()) {
      try {
        const expense = this.formatExpense();
        const resp = await createExpense(expense);
        if (!!resp.errors) {
          showMessage(prettyServerErrors(resp.errors), "error")
        } else {
          showMessage(`Saved ${resp.name}`);
          this.props.removeExpense(this.props.index);
          this.props.importBudgetItemExpense(resp);
          this.setState({
            categoryId: "",
            itemId: "",
          });
        }
      } catch(err) {
        apiError(err.message)
      }
    }
  }

  filterOption(input, option) {
    return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  handleCategoryChange = (categoryId) => {
    this.setState({categoryId, itemId: ""});
  }

  handleItemChange = (itemId) => {
    this.setState({itemId});
  }

  skip = () => {
    this.props.removeExpense(this.props.index);
    this.setState({
      categoryId: "",
      itemId: "",
    });
  }

  possibleDuplicate = () => {
    let possible = false;
    const expense = this.formatExpense();

    this.props.budgetItemExpenses.map(e => {
      const matches = (
        e.name === expense.name &&
        e.amount === expense.amount &&
        e.date === expense.date
      );

      if (matches) {
        possible = true;
      }
    });


    if (possible) {
      const style = {
        color: "#ffd27e",
        padding: "2px",
        fontSize: "26px",
        display: "block",
      }
      return (
        <span title="Possible Duplicate">
          <Icon type="exclamation-circle" style={style} />
        </span>
      )
    }
  }

  render() {
    const disabled = this.disabled();
    const possibleDuplicate = this.possibleDuplicate();
    return (
      <div>
        <Row>
          <Col span={16}>
            <Select showSearch
                    style={{ width: '200px', marginBottom: '5px'}}
                    placeholder="Select Category"
                    optionFilterProp="children"
                    value={this.state.categoryId}
                    onChange={this.handleCategoryChange}
                    filterOption={this.filterOption}>
                {
                  this.props.budgetCategories.map((category,i) => {
                    return <Select.Option key={i} value={`${category.id}`}>{category.name}</Select.Option>
                  })
                }
            </Select>
            <Select showSearch
                    style={{ width: '200px'}}
                    placeholder="Select Item"
                    value={this.state.itemId}
                    optionFilterProp="children"
                    onChange={this.handleItemChange}
                    filterOption={this.filterOption}>
                {
                  this.props.budgetItems.filter(item => String(item.budget_category_id) === this.state.categoryId).map((item,i) => {
                    return <Select.Option key={i} value={`${item.id}`}>{item.name}</Select.Option>
                  })
                }
            </Select>
          </Col>
          <Col span={8}>
            <div className='text-center'>
              <span style={{marginRight: '5px'}}>
                <Button onClick={this.save}
                      type="primary"
                      disabled={disabled}
                      shape="circle"
                      icon="plus" />
              </span>
              <span title="Skip importing">
                <Button onClick={this.skip}
                      type="warning"
                      shape="circle"
                      icon="forward" />
              </span>
              {possibleDuplicate}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import {
  importBudgetItemExpense,
} from '../actions/BudgetItemExpense'
const mapStateToProps = (state) => {
  const {budgetCategories, budgetItems, budgetItemExpenses} = state.budgetState;
  return {
    budgetCategories,
    budgetItems,
    budgetItemExpenses,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    importBudgetItemExpense: (budgetItemExpense) => {
      dispatch(importBudgetItemExpense(budgetItemExpense));
    },
	}
}

const AddExpense = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExpenseForm);

export default class ImportExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsing: false,
      rows: [],
      headers: {},
    };
  }

  static propTypes = {
    hidden: React.PropTypes.bool.isRequired,
    cancel: React.PropTypes.func.isRequired,
  }

  removeExpense = (index) => {
    this.setState({
      rows: [
        ...this.state.rows.slice(0, index),
        ...this.state.rows.slice(index + 1)
      ]
    });
  }

  parseFile = (e) => {
    const file = e.target.files[0];

    if (file !== undefined) {
      this.setState({rows: [], parsing: true});
      Papa.parse(file, {
        skipEmptyLines: true,
        step: (row) => {
          this.setState({rows: [...this.state.rows, row.data[0]]});
        },
        complete: (results,file) => {
          let headers = {};
          headers.date   = findIndex(this.state.rows[0], (col) => { return col.toLowerCase().trim().includes("date") });
          headers.name   = findIndex(this.state.rows[0], (col) => { return col.toLowerCase().trim().includes("description") });
          headers.amount = findIndex(this.state.rows[0], (col) => { return col.toLowerCase().trim().includes("amount") });

          if (headers.date === -1 || headers.name === -1 || headers.amount === -1) {
            this.setState({parsing: false, rows: [], csvError: "Invalid Headers"})
          } else {
            this.setState({parsing: false, headers});
          }
        },
        error: (error, file) => {
          this.setState({parsing: false});
        }
      });
    } else {
      this.setState({parsing: false});
    }
  }

  chooseFile() {
    document.getElementById('import-csv').click();
  }

  resetFile() {
    document.getElementById('import-csv').value="";
  }

  errors = () => {
    const {csvError} = this.state;
    if (csvError !== undefined) {
      return <p className="alert-color">{csvError}</p>
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.rows && this.state.rows.length > 1 && nextState.rows.length === 1) {
      this.close();
      return false;
    } else {
      return true;
    }
  }

  content = () => {
    if (this.state.parsing) {
      return (
        <div className="parsing-file">
          <p className="primary-color">Parsing File</p>
          <Progress percent={100} status="active" showInfo={false} />
        </div>
      );
    } else if (this.state.rows.length) {
      const {headers} = this.state;
      const columns = [{
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 100,
      }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 75,
      }, {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: 300,
      }]

      const data = this.state.rows.map((row, index) => {
        if (index !== 0) {
          return {
            key: `tx-${index}`,
            date: row[headers.date],
            name: row[headers.name],
            amount: numberToCurrency(Math.abs(parseFloat(row[headers.amount]))),
            action: <AddExpense expense={row} index={index} removeExpense={this.removeExpense} headers={this.state.headers} />
          }
        }
      }).filter(row => row !== undefined);

      return (
        <div>
          <Table editable={true} size="middle" bordered={true} columns={columns} dataSource={data} />
        </div>
      )
    } else {
      return (
        <div>
          {this.errors()}
          <p>
            File should have 3 headers:
          </p>
          <p>
            <b>date, description, amount</b>
          </p>
          <br />
          <Button onClick={this.chooseFile}
                type="primary"
                size="large"
                icon="file-text">
            Choose File
          </Button>
        </div>
      );
    }
  }

  close = () => {
    this.setState({
      parsing: false,
      rows: [],
      csvError: undefined,
      headers: {},
    });
    this.resetFile();
    this.props.cancel();
  }

  render() {
    const width = this.state.rows.length > 0 ? 900 : 400;
    return (
      <Modal title="Import Expenses"
             visible={this.props.hidden}
             width={width}
             footer={null}
             onOk={this.close}
             onCancel={this.close}>
        <div className='choose-file-container'>
          <input type="file" id="import-csv" onChange={this.parseFile} style={{display: 'none'}} />
          {this.content()}
        </div>
      </Modal>
    );
  }
}
