const React = require('react-native');

const {
  NavigationExperimental
} = React;

const  {
  Reducer: NavigationReducer,
} = NavigationExperimental;

let NavReducer = NavigationReducer.StackReducer({
  getPushedReducerForAction: (action) => {
    switch (action.type) {
      case 'push':
        return (state) => state || {key: action.key};
      case 'back':
        return {}
      default:
        return (state) => state
    }

    return null;
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    key: 'AnimatedExampleStackKey',
    index: 0,
    children: [
      {type: 'push', key: 'home'},
    ],
  },
});

module.exports = NavReducer;
