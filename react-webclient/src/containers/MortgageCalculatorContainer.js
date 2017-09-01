import { connect } from 'react-redux';
import MortgageCalculator from '../components/MortgageCalculator';
import { updateState } from '../actions/MortgageCalculator';

export default connect(
  state => ({
    ...state.mortgageCalculator,
  }),
  dispatch => ({
    updateState: state => {
      dispatch(updateState(state));
    },
  })
)(MortgageCalculator);
