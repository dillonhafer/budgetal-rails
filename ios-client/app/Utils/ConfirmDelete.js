'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View
} = React;

var styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: 'red'
  }
});

var BUTTONS = [
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

var ConfirmDelete = React.createClass({
  showActionSheet: function() {
    var self = this
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex == DESTRUCTIVE_INDEX) {
        self.props.delete()
      }
    });
  },
  render: function() {
    return (
      <TouchableHighlight style={styles.button}
                          underlayColor='#EEE'
                          onPress={this.showActionSheet}>
        <Text style={styles.text}>Delete</Text>
      </TouchableHighlight>
    )
  }
})

module.exports = ConfirmDelete;