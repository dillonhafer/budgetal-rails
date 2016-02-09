var types = require('../constants/ActionTypes');
const initialState = {
  count: 0
};

module.exports = function(state, action) {
  action = action || {}
  state = state || initialState
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}
