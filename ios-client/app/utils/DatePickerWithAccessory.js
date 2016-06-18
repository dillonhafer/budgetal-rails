import React, {Component,PropTypes} from 'react'
import {
  DatePickerIOS,
  Dimensions,
  LayoutAnimation,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
const {width} = Dimensions.get('window');

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
    let current = begin;
    let years = [current];
    while (current < end) {
      current = String(parseInt(current) + 1);
      years.push(current);
    }
    return years;
  }

  _getPickerItems(years) {
    return years.map((year) => (<Picker.Item key={year} value={year} label={year} />))
  }

  _renderYear = () => {
    const years = this._getYears(this.props.beginningYear, this.props.endingYear);

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
          {this._getPickerItems(years)}
        </Picker>
      </View>
    );
  }

  render() {
    switch (this.props.type) {
      case 'year':
        return this._renderYear();
        break;
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
    backgroundColor: '#f6f6f6'
  },
  datePicker: {
    width: width,
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute'
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
    fontSize: 18
  }
});

module.exports = DatePickerWithAccessory;
