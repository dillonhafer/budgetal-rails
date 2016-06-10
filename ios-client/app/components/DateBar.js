import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import {monthName} from '../Utils/ViewHelpers';

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
    let month = monthName(date.getMonth());
    return `${month} ${date.getFullYear()}`;
  }

  _changeMonth = (date, amount) => {
    var year = date.getFullYear();
    var month = date.getMonth();
    var alteredDate = new Date(year, month + amount);
    this.props.onDateChange(alteredDate);
  }

  nextYearButton(date) {
    return (<TouchableHighlight
              style={styles.changeMonth}
              underlayColor='transparent'
              onPress={this._changeMonth.bind(this, date, 1)}>
              <Icon name="chevron-right" style={styles.icon} />
            </TouchableHighlight>);
  }

  previousYearButton(date) {
    return (<TouchableHighlight
              style={styles.changeMonth}
              underlayColor='transparent'
              onPress={this._changeMonth.bind(this, date, -1)}>
              <Icon name="chevron-left" style={styles.icon} />
            </TouchableHighlight>);
  }

  render() {
    let date = this.props.date;
    return (
      <View style={styles.container}>
        {this.previousYearButton(date)}
        <TouchableHighlight underlayColor='transparent' onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.menuDate(date)}</Text>
        </TouchableHighlight>
        {this.nextYearButton(date)}
      </View>
    )
  }
}

module.exports = DateBar;
