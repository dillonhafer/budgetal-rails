import React, {Component,PropTypes} from 'react'
import {
  DatePickerIOS,
  Dimensions,
  LayoutAnimation,
  Picker,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import StyleSheet from '../components/StyleSheet'
const {width} = Dimensions.get('window');

import {range} from 'lodash-node'
import {monthName} from './ViewHelpers'

// Work around while waiting for RN to fix issue 4547 (stuck in review):
// https://github.com/facebook/react-native/issues/4547
DatePickerIOS.propTypes.date = PropTypes.any.isRequired
DatePickerIOS.propTypes.onDateChange = PropTypes.func

class DatePickerWithAccessory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: props.showDatePicker
    }
  }

  componentWillReceiveProps = (nextProps) => {
    LayoutAnimation.easeInEaseOut();
    this.setState({showDatePicker: nextProps.showDatePicker});
  }

  _renderDate = () => {
    return (
      <View style={this.state.showDatePicker ? styles.datePicker : styles.hidden}>
        <View style={styles.inputAccessory}>
          <TouchableHighlight underlayColor='transparent' onPress={this.props.onDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableHighlight>
        </View>
        <DatePickerIOS date={this.props.date}
                       mode='date'
                       onDateChange={this.props.onDateChange} />
      </View>
    );
  }

  _getYears(begin, end) {
    return range(begin, end).map(n => String(n))
  }

  _renderYear = () => {
    const years = this._getYears(this.props.beginningYear, this.props.endingYear);
    const items = years.map((year) => (<Picker.Item key={year} value={year} label={year} />))
    return (
      <View style={this.state.showDatePicker ? styles.yearPicker : styles.hidden}>
        <View style={styles.inputAccessory}>
          <TouchableHighlight underlayColor='transparent' onPress={this.props.onDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableHighlight>
        </View>
        <Picker selectedValue={String(this.props.year)}
                   itemStyle={{textAlign: 'center'}}
                   onValueChange={this.props.onDateChange}>
          {items}
        </Picker>
      </View>
    );
  }

  _yearMonthChange(firstArg, first, second) {
    const [year,month]  = firstArg === 'year' ? [second,first] : [first,second]
    this.props.onValueChange(year, month)
  }

  _renderYearMonth = () => {
    const years = this._getYears(this.props.beginningYear, this.props.endingYear);
    const months = range(0,12).map((idx) => {return {value: String(idx+1), label: monthName(idx)}})

    const yearItems  = years.map((year) => (<Picker.Item key={year} value={year} label={year} />))
    const monthItems = months.map((month) => (<Picker.Item key={month.value} value={month.value} label={month.label} />))

    return (
      <View style={this.state.showDatePicker ? styles.yearPicker : styles.hidden}>
        <View style={styles.inputAccessory}>
          <TouchableHighlight underlayColor='transparent' onPress={this.props.onDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.yearMonthContainer}>
          <View style={styles.yearMonthPicker}>
            <Picker selectedValue={String(this.props.month)}
                       itemStyle={{textAlign: 'center'}}
                       onValueChange={this._yearMonthChange.bind(this, 'month', this.props.year)}>
              {monthItems}
            </Picker>
          </View>
          <View style={styles.yearMonthPicker}>
            <Picker selectedValue={String(this.props.year)}
                       itemStyle={{textAlign: 'center'}}
                       onValueChange={this._yearMonthChange.bind(this, 'year', this.props.month)}>
              {yearItems}
            </Picker>
          </View>
        </View>
      </View>
    );
  }

  render() {
    switch (this.props.type) {
      case 'year':
        return this._renderYear();
      case 'year-month':
        return this._renderYearMonth();
      default:
        return this._renderDate();
    }
  }
}

const styles = StyleSheet.create({
  hidden: {
    height: 0,
    bottom: -600
  },
  inputAccessory: {
    padding: 10,
    width: 400,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#e6e6e6',
    borderTopWidth: 0.5,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 0.5,
  },
  datePicker: {
    width: width,
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
  },
  yearPicker: {
    width: width,
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute'
  },
  doneText: {
    fontSize: 18,
    color: '$blue'
  },
  yearMonthContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  yearMonthPicker: {
    width: width/2,
  }
});

module.exports = DatePickerWithAccessory;
