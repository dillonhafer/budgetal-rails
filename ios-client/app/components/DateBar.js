import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import {monthName} from '../utils/ViewHelpers';

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
  }
});

class DateBar extends Component {
  constructor(props) {
    super(props)
  }

  menuDate(date) {
    const month = monthName(date.getMonth());
    const year = date.getFullYear();
    return [month,year].join(' ');
  }

  _changeMonth = (date, amount) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const alteredDate = new Date(year, month + amount);
    this.props.onDateChange(alteredDate);
  }

  _changeYear = (year, amount) => {
    const alteredYear = year + amount;
    this.props.onDateChange(alteredYear);
  }

  nextButton(date, changeFunction) {
    return (<TouchableHighlight
              style={styles.changeMonth}
              underlayColor='transparent'
              onPress={changeFunction.bind(this, date, 1)}>
              <Icon name="chevron-right" style={styles.icon} />
            </TouchableHighlight>);
  }

  previousButton(date, changeFunction) {
    return (<TouchableHighlight
              style={styles.changeMonth}
              underlayColor='transparent'
              onPress={changeFunction.bind(this, date, -1)}>
              <Icon name="chevron-left" style={styles.icon} />
            </TouchableHighlight>);
  }

  _renderMonth = () => {
    const date = this.props.date;
    return (
      <View style={styles.container}>
        {this.previousButton(date, this._changeMonth)}
        <TouchableHighlight underlayColor='transparent' onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.menuDate(date)}</Text>
        </TouchableHighlight>
        {this.nextButton(date, this._changeMonth)}
      </View>
    )
  }

  _renderYear = () => {
    return (
      <View style={styles.container}>
        {this.previousButton(this.props.year, this._changeYear)}
        <TouchableHighlight underlayColor='transparent' onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.props.year}</Text>
        </TouchableHighlight>
        {this.nextButton(this.props.year, this._changeYear)}
      </View>
    )
  }

  render() {
    switch (this.props.type) {
      case 'year':
        return this._renderYear()
      default:
        return this._renderMonth()
    }
  }
}

module.exports = DateBar;
