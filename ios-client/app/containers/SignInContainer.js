import { connect } from 'react-redux'

import SignIn from '../components/SignIn'
import { navigateReset, navigatePush } from '../actions'


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSignIn: () => {
			dispatch(navigateReset([{key: 'AnnualBudgets', title: 'Annual Budgets'}],0))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn)
