import React from 'react';
import classNames from 'classnames';
import InputField from '../forms/input_field';
import {numberToCurrency, remainingClass} from '../../utils/helpers';

export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    group: React.PropTypes.string.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired
  }

  update = (item, e) => {
    item[e.target.name] = e.target.value
    this.props.update(this.props.index, this.props.group, item)
  }

  save = (e) => {
    e.preventDefault();
    this.props.save(this.props.item)
  }

  remaining(item) {
    var total = parseFloat(item.other_allocated) + parseFloat(item.amount_budgeted);
    return _.round(parseFloat(item.budget_item.amount) - total, 2)
  }

  render() {
    var item = this.props.item;
    var remaining = this.remaining(item);
    var remainClass = remainingClass(remaining);
    return (
      <div className='row'>
        <div className='large-4 medium-4 columns'>
          {item.budget_item.name}
        </div>
        <form onSubmit={this.save}>
          <div className='large-2 medium-3 columns'>
            <InputField type="number" required={true} name='amount_budgeted' onChange={this.update.bind(this,item)} defaultValue={numberToCurrency(item.amount_budgeted, '')} value={item.amount_budgeted} step='any' min='0.00' placeholder='0.00' errors={item.errors} />
          </div>
          <div className='large-2 medium-2 columns'>
            <span className={remainClass}>{numberToCurrency(remaining)}</span>
          </div>
          <div className='large-4 medium-3 columns'>
            <button className='tiny radius success button'>
              <i className='fi-icon fi-check'></i> Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}