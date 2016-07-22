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
    const years = this._getYears(this.props.beginningYear, this.props.endingYear+1);
    const items = years.map((year) => (<Picker.Item key={year} value={year} label={year} />))
    return (
      <View style={this.state.showDatePicker ? styles.yearPicker : styles.hidden}>
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
    const years = this._getYears(this.props.beginningYear, this.props.endingYear+1);
    const months = range(0,12).map((idx) => {return {value: String(idx+1), label: monthName(idx)}})

    const yearItems  = years.map((year) => (<Picker.Item key={year} value={year} label={year} />))
    const monthItems = months.map((month) => (<Picker.Item key={month.value} value={month.value} label={month.label} />))

    return (
      <View style={this.state.showDatePicker ? styles.yearPicker : styles.hidden}>
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
  },
  inputAccessory: {
    padding: 10,
    width: width,
    backgroundColor: '$inputAccessory',
    borderTopColor: '$formBorder',
    borderTopWidth: 0.5,
    alignSelf: 'flex-end',
  },
  datePicker: {
    width: width,
    flex: 1,
  },
  yearPicker: {
    width: width,
    flex: 1,
    justifyContent: 'center',
  },
  doneText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '$inputAccessoryButton',
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
