import { connect } from 'react-redux'

import Menu from '../Views/Menu'
import { navigateReset, navigatePush } from '../actions/Navigation'
import {endSession} from '../Data/sessions';
import {alert} from '../Utils/window';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		budgets: () => {
			dispatch(navigateReset([{key: 'Budgets', title: 'Budgets'}],0))
		},
		statistics: () => {
			dispatch(navigateReset([{key: 'Statistics', title: 'Statistics'}],0))
		},
		annualBudgets: () => {
			dispatch(navigateReset([{key: 'AnnualBudgets', title: 'Annual Budgets'}],0))
		},
		signOut: () => {
			endSession().then(() => {
				dispatch(navigateReset([{key: 'SignIn', title: ''}],0))
				alert({title: 'Signed Out', message: 'Thanks for using Budgetal!'});
	    });
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu)
