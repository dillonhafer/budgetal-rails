import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import InputField from '../forms/input_field';
import {numberToCurrency} from '../../utils/helpers';

export default class AllocationPlanModal extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    plan: React.PropTypes.object,
    hidden: React.PropTypes.bool.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired
  }

  updateForm = (event, date) => {
    var dateFields = ['start_date', 'end_date'];
    if (dateFields.includes(event)) {
      var fakeTarget = {name: event, value: date};
      event = {target: fakeTarget};
    }
    let newProperties = { [event.target.name]: event.target.value };
    var plan = _.assign({}, this.props.plan, newProperties)
    this.props.update(plan);
  }

  cancel = (e) => {
    e.preventDefault();
    var stayOpen = _.isEmpty(_.intersection(e.target.classList, ['overlay', 'close-button']));
    if (!stayOpen) { this.props.cancel(); }
  }

  render() {
    var plan = this.props.plan;
    let classes = classNames('overlay tiny', {
      fadeIn: this.props.hidden,
      hide: !this.props.hidden
    });
    return (
      <div className={classes} onClick={this.cancel}>
        <div className="page">
          <a href='#' className="close-button" onClick={this.cancel}>&#215;</a>
          <h3>Pay Period</h3>
          <hr />

          <form onSubmit={this.props.save}>
            <div className='row'>
              <div className='large-5 columns'>
                <label htmlFor='start_date'>Start Date</label>
                <InputField type='date' date={plan.start_date} onChange={this.updateForm.bind(null, 'start_date')} name='start_date' errors={plan.errors} />
              </div>
              <div className='large-2 columns centered'><br />TO</div>
              <div className='large-5 columns'>
                <label htmlFor='end_date'>End Date</label>
                <InputField type='date' date={plan.end_date} onChange={this.updateForm.bind(null, 'end_date')} name='end_date' errors={plan.errors} />
              </div>
            </div>
            <div className='row'>
              <div className='large-7 columns'>
                <label htmlFor='income'>Pay Period Income</label>
                <InputField type="number" id='income' name='income' onChange={this.updateForm} defaulValue={numberToCurrency(plan.income, '')} value={plan.income} step='any' min='0.00' required={true} placeholder='0.00' errors={plan.errors} />
              </div>
              <div className='large-5 columns text-center'>
                <label>&nbsp;</label>
                <button href='#' className="tiny success button radius" onClick={this.props.save}>
                  <i className='fi-icon fi-check'></i> Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}