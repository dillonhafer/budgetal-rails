var React = require('react-native')

var {
  AlertIOS,
  Alert,
  LinkingIOS
} = React

exports.alert = function (content) {
  AlertIOS.alert(content.title, content.message)
}

exports.link = function (url) {
  LinkingIOS.canOpenURL(url, (supported) => {
    if (!supported) {
      console.warn("Can't support the url")
    } else {
      LinkingIOS.openURL(url)
    }
  })
}

exports.confirm = function(title, message, callback) {
  Alert.alert(title, message,
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: callback},
    ]
  );
}
