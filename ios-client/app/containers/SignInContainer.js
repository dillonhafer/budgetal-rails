import { connect } from 'react-redux'

import SignIn from '../components/SignIn'
import { navigateReset, navigatePush } from '../actions/Navigation'


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSignIn: () => {
			dispatch(navigateReset([{key: 'Budgets', title: 'Budgets'}],0))
		},
    signUp: () => {
      dispatch(navigatePush({key: 'SignUp', title: 'Sign Up'}))
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn)
