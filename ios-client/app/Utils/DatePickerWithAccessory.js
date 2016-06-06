import React, {Component,PropTypes} from 'react'
import {
  DatePickerIOS,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

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

  render() {
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
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute'
  },
  doneText: {
    fontSize: 18
  }
});

module.exports = DatePickerWithAccessory;
