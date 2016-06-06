import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import {monthName} from '../Utils/ViewHelpers';
import {WHITE, GRAY_BACKGROUND, GRAY_BORDER, GRAY, CLEAR} from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: GRAY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: WHITE,
    borderBottomColor: GRAY_BORDER
  },
  centerYear: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: GRAY,
  },
  icon: {
    textAlign: 'center',
    color: GRAY,
    fontSize: 24,
  },
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
              style={[styles.rightYear]}
              underlayColor='transparent'
              onPress={this._changeMonth.bind(this, date, 1)}>
              <Icon name="chevron-right" style={styles.icon} />
            </TouchableHighlight>);
  }

  previousYearButton(date) {
    return (<TouchableHighlight
              style={[styles.leftYear]}
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
        <TouchableHighlight underlayColor={CLEAR} onPress={this.props.toggleDatePicker}>
          <Text style={styles.centerYear}>{this.menuDate(date)}</Text>
        </TouchableHighlight>
        {this.nextYearButton(date)}
      </View>
    )
  }
}

module.exports = DateBar;
