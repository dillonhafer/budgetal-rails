import React from 'react';
import classNames from 'classnames';
import {moveItem} from '../../data/budget_item';
import _ from 'lodash';
import {monthName, selectedValue, monthOptions, yearOptions} from '../../utils/helpers';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.dropped = _.debounce(this.dropped, 100)
  }

  state = {
    showForm: false
  }

  static propTypes = {
    budget: React.PropTypes.object.isRequired,
    moveBudgetItem: React.PropTypes.func.isRequired,
    changeBudget: React.PropTypes.func.isRequired,
    changeMonth: React.PropTypes.func.isRequired,
    currentCategoryId: React.PropTypes.number.isRequired,
    changeCategory: React.PropTypes.func.isRequired
  }

  changeCategory(category, e) {
    e.preventDefault();
    this.props.changeCategory(category.id);
  }

  toggleChangeBudget = (e) => {
    e.preventDefault()
    this.setState({showForm: !this.state.showForm})
  }

  changeYear = () => {
    this.props.changeBudget()
    this.setState({showForm: !this.state.showForm})
  }

  dropped = (item_id, response) => {
    this.props.moveBudgetItem(item_id)
    document.querySelector('a.item.active').focus()
    showMessage(response.message)
  }

  drop = (e) => {
    e.preventDefault();
    var item_id = e.dataTransfer.getData('budget_item_id');
    var original_category_id = e.dataTransfer.getData('original_category_id');
    var category_id = e.target.dataset.id;

    if (category_id !== original_category_id) {
      moveItem(category_id, item_id)
        .done(this.dropped.bind(null, item_id))
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

  prevMonth = () => {
    this.props.changeMonth(-1);
  }

  nextMonth = () => {
    this.props.changeMonth(1);
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
            this.props.budget.budget_categories.map((category, index) => {
              var categoryClass = 'sidebar-'+category.name.toLowerCase().replace('/','-')
              var classes = classNames({
                'item': true,
                'active': category.id === self.props.currentCategoryId
              }, categoryClass);
              return (
                <a onDrop={self.drop} onDragOver={self.dragOver} key={index} data-id={category.id} onClick={self.changeCategory.bind(this, category)} href="#" className={classes}>
                  <label onDrop={self.drop} onDragOver={self.dragOver} data-id={category.id}>{category.name}</label>
                </a>
              );
            })
          }
        </div>
      </div>
    )
  }
}
