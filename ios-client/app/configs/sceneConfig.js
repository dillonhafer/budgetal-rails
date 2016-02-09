var React = require('react-native')

var {
  Navigator,
  Dimensions
} = React

var { Dimensions } = React;
var { width, height } = Dimensions.get('window');


var baseConfig = Navigator.SceneConfigs.FloatFromRight;
var popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
    edgeHitWidth: width / 3
});


var fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromRight.gestures.pop, {
    edgeHitWidth: width
})


exports.customFloatFromRight = Object.assign({}, baseConfig, {
    gestures: {
        pop: popGestureConfig
    }
})


exports.customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromRight, {
    gestures: {
        pop: fullPopGestureConfig
    }
})
