import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import DatePickerWithAccessory from '../utils/DatePickerWithAccessory';
import Icon from 'react-native-vector-icons/FontAwesome';
import {monthName,monthStep} from '../utils/ViewHelpers';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '$grayBackground',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '$white',
    borderBottomColor: '$grayBorder'
  },
  centerYear: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '$gray',
  },
  icon: {
    textAlign: 'center',
    color: '$gray',
    fontSize: 24,
    width: 24,
    height: 24,
  },
  changeMonth: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
  },
  disabled: {
    opacity: 0.3
  },
});

class DateBarView extends Component {
  constructor(props) {
    super(props)
  }

  menuDate(month,year) {
    return [monthName(month-1),year].join(' ');
  }

  _changeMonth = (month, year, amount) => {
    const newDate = monthStep(month,year,amount);
    this.props.onDateChange(newDate.year,newDate.month);
  }

  _changeYear = (year, amount) => {
    this.props.onDateChange(year+amount);
  }

  nextButton(onPress, enabled, ...args) {
    const disabled = enabled ? {} : styles.disabled;
    const press = enabled ? onPress : () => {};
    return (<TouchableHighlight
              style={[styles.changeMonth,disabled]}
              underlayColor='transparent'
              onPress={press.bind(this, ...args, 1)}>
              <Icon name="chevron-right" style={styles.icon} />
            </TouchableHighlight>);
  }

  previousButton(onPress, enabled, ...args) {
    const disabled = enabled ? {} : styles.disabled;
    const press = enabled ? onPress : () => {};
    return (<TouchableHighlight
              style={[styles.changeMonth,disabled]}
              underlayColor='transparent'
              onPress={press.bind(this, ...args, -1)}>
              <Icon name="chevron-left" style={styles.icon} />
            </TouchableHighlight>);
  }

  _renderMonthYear = () => {
    const firstEnabled = [this.props.month,this.props.year].join() !== [1,this.props.beginningYear].join()
    const lastEnabled  = [this.props.month,this.props.year].join() !== [12,this.props.endingYear].join()
    return (
      <View style={styles.container}>
        {this.previousButton(this._changeMonth, firstEnabled, this.props.month, this.props.year)}
        <TouchableHighlight underlayColor='transparent' onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.menuDate(this.props.month, this.props.year)}</Text>
        </TouchableHighlight>
        {this.nextButton(this._changeMonth, lastEnabled, this.props.month, this.props.year)}
      </View>
    )
  }

  _renderYear = () => {
    const firstEnabled = this.props.year !== this.props.beginningYear
    const lastEnabled  = this.props.year !== this.props.endingYear
    return (
      <View style={styles.container}>
        {this.previousButton(this._changeYear, firstEnabled, this.props.year)}
        <TouchableHighlight underlayColor='transparent' onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.props.year}</Text>
        </TouchableHighlight>
        {this.nextButton(this._changeYear, lastEnabled, this.props.year)}
      </View>
    )
  }

  _getBar(type) {
    switch (type) {
      case 'year':
        return this._renderYear();
      default:
        return this._renderMonthYear();
    }
  }

  render() {
    const bar = this._getBar(this.props.type);

    return (
      <View style={this.props.style}>
        {bar}
        {this.props.children}
        <DatePickerWithAccessory showDatePicker={this.props.showDatePicker}
                                 type={this.props.type}
                                 onDone={this.props.toggleDatePicker}
                                 onValueChange={this.props.onDateChange}
                                 beginningYear={this.props.beginningYear}
                                 endingYear={this.props.endingYear}
                                 year={this.props.year}
                                 month={this.props.month} />
      </View>
    )
  }
}

module.exports = DateBarView;
