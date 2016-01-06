import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {monthName, selectedValue, monthOptions, yearOptions} from '../../utils/helpers';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { showForm: false }

  static propTypes = {
    budget: React.PropTypes.shape({
      month: React.PropTypes.number.isRequired,
      year:  React.PropTypes.number.isRequired
    }),
    categories: React.PropTypes.array,
    changeBudget: React.PropTypes.func.isRequired,
    changeMonth: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    categories: [
      {name: 'Charity'},
      {name: 'Saving'},
      {name: 'Housing'},
      {name: 'Utilities'},
      {name: 'Food'},
      {name: 'Clothing'},
      {name: 'Transportation'},
      {name: 'Medical/Health'},
      {name: 'Insurance'},
      {name: 'Personal'},
      {name: 'Recreation'},
      {name: 'Debts'}
    ]
  }

  toggleChangeBudget = (e) => {
    e.preventDefault()
    this.hideForm();
  }

  changeYear = () => {
    this.props.changeBudget()
    this.hideForm();
  }

  prevMonth = () => {
    this.props.changeMonth(-1);
    this.hideForm();
  }

  nextMonth = () => {
    this.props.changeMonth(1);
    this.hideForm();
  }

  hideForm = () => {
    this.setState({showForm: !this.state.showForm});
  }

  preparedName(name) {
     return name.toLowerCase().replace('/','-');
  }

  categoryClass(name) {
    return `item sidebar-${this.preparedName(name)}`;
  }

  categories = () => {
    if (this.props.categories.length) {
      return this.props.categories
    } else {
      return [
        {name: 'Charity'},
        {name: 'Saving'},
        {name: 'Housing'},
        {name: 'Utilities'},
        {name: 'Food'},
        {name: 'Clothing'},
        {name: 'Transportation'},
        {name: 'Medical/Health'},
        {name: 'Insurance'},
        {name: 'Personal'},
        {name: 'Recreation'},
        {name: 'Debts'}
      ]
    }
  }

  render() {
    let changeYear = classNames('tooltip animate', {
          fadeIn: this.state.showForm,
          hide: !this.state.showForm
        });
    var self = this;
    return (
      <div className='large-2 medium-2 hide-for-small-down columns category-list'>
        <div className="icon-bar vertical six-up label-right">
          <a onClick={this.toggleChangeBudget} className='item header text-center' href='#'>
            <label><i className='fi-calendar'></i> {monthName(this.props.budget.month)} {this.props.budget.year}</label>
          </a>
          <span className={changeYear}>
            <p className='text-center size-12'>
              <i onClick={this.prevMonth} className='fi-arrow-left size-16'></i>
              Change Budget
              <i onClick={this.nextMonth} className='fi-arrow-right size-16'></i>
            </p>
            <p>
              <select id="budget_month" name='budget_month' value={this.props.budget.month} onChange={this.changeYear}>
                {monthOptions()}
              </select>
              <select id="budget_year" name='budget_year' value={this.props.budget.year} onChange={this.changeYear}>
                {yearOptions()}
              </select>
            </p>
          </span>
          {
            this.categories().map((category, index) => {
              var cls  = self.categoryClass(category.name);
              var href = `#${self.preparedName(category.name)}`;
              return (<a key={index} href={href} className={cls}><label>{category.name}</label></a>);
            })
          }
        </div>
      </div>
    )
  }
}
