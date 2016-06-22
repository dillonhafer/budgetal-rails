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
			dispatch(navigateReset([{key: 'Account', title: 'Budgets'}],0))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn)
