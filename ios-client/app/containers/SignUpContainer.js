import { connect } from 'react-redux'

import SignUp from '../components/SignUp'
import { navigateReset, navigatePush, navigatePop } from '../actions/Navigation'
const window = require('../utils/window');

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSignUp: () => {
      window.alert({title: 'Welcome to Budgetal', message: 'You are now signed in.'});
			dispatch(navigateReset([{key: 'Budgets', title: 'Budgets'}],0))
		},
    goBack: () => {
      dispatch(navigatePop());
    },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp)
