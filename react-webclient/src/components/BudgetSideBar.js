import React from 'react';
import classNames from 'classnames';
import {moveItem} from '../data/BudgetItem';
import {find, debounce} from 'lodash';
import {monthName, selectedValue, monthOptions, yearOptions} from '../utils/helpers';
import {Link} from 'react-router';

export default class BudgetSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.dropped = debounce(this.dropped, 100)
    this.state = {
      showForm: false
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  static propTypes = {
    budget: React.PropTypes.object.isRequired,
    moveBudgetItem: React.PropTypes.func.isRequired,
    currentCategoryId: React.PropTypes.number.isRequired,
  }

  incrementMonth(date, number) {
    const year     = date.getFullYear();
    const month    = date.getMonth();
    const newMonth = month + number;
    return new Date(year, newMonth);
  }

  changeMonth = (number) => {
    const currentDate = new Date(this.props.budget.year, this.props.budget.month-1, 1);
    const newDate = this.incrementMonth(currentDate, number);
    const date = {year: newDate.getFullYear(), month: newDate.getMonth() + 1}
    this.context.history.push(`/budgets/${date.year}/${date.month}`)
  }

  changeCategory(category, e) {
    e.preventDefault();
    const lowerName = category.name.toLowerCase().replace('/', '-');
    window.location.hash = `#${lowerName}`
    this.props.changeCategory(category);
  }

  toggleChangeBudget = (e) => {
    e.preventDefault()
    this.setState({showForm: !this.state.showForm})
  }

  changeBudget = () => {
    const year  = selectedValue('#budget_year');
    const month = selectedValue('#budget_month');
    this.context.history.push(`/budgets/${year}/${month}`)
    this.setState({showForm: !this.state.showForm})
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

  render() {
    const changeYear = classNames('tooltip animate', {
      fadeIn: this.state.showForm,
      hide: !this.state.showForm
    });
    return (
      <div className='large-2 medium-2 hide-for-small-down columns category-list'>
        <div className="icon-bar vertical six-up label-right">
          <a onClick={this.toggleChangeBudget} className='item header text-center' href='#'>
            <label><i className='fi-calendar'></i> {monthName(this.props.budget.month)} {this.props.budget.year}</label>
          </a>
          <span className={changeYear}>
            <p className='text-center size-12'>
              <i onClick={this.changeMonth.bind(this,-1)} className='fi-arrow-left size-16'></i>
              Change Budget
              <i onClick={this.changeMonth.bind(this,1)} className='fi-arrow-right size-16'></i>
            </p>
            <p>
              <select id="budget_month" name='budget_month' value={this.props.budget.month} onChange={this.changeBudget}>
                {monthOptions()}
              </select>
              <select id="budget_year" name='budget_year' value={this.props.budget.year} onChange={this.changeBudget}>
                {yearOptions()}
              </select>
            </p>
          </span>
          {
            this.props.budget.budget_categories.map((category, index) => {
              const lowerName = category.name.toLowerCase().replace('/','-');
              const categoryClass = `sidebar-${lowerName}`
              const classes = classNames({
                'item': true,
                'active': category.id === this.props.currentCategoryId
              }, categoryClass);
              return (
                <Link onDrop={this.drop} onDragOver={this.dragOver} key={index} data-id={category.id} onClick={this.changeCategory.bind(this, category)} to='#' hash={`${lowerName}`} className={classes}>
                  <label onDrop={this.drop} onDragOver={this.dragOver} data-id={category.id}>{category.name}</label>
                </Link>
              );
            })
          }
        </div>
      </div>
    )
  }
}
