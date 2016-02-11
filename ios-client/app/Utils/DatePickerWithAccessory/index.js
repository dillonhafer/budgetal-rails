'use strict';

var React = require('react-native');
var {
  DatePickerIOS,
  LayoutAnimation,
  Text,
  TouchableHighlight,
  View
} = React;

var styles = require("./styles");

var DatePickerWithAccessory = React.createClass({
  getInitialState: function() {
    return ({
      showDatePicker: this.props.showDatePicker
    });
  },
  componentWillReceiveProps: function(nextProps) {
    LayoutAnimation.easeInEaseOut();
    this.setState({showDatePicker: nextProps.showDatePicker});
  },
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
});

module.exports = DatePickerWithAccessory;
