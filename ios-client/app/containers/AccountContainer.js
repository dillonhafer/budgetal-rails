import { connect } from 'react-redux'

import Account from '../components/Account'
import { navigatePop, navigatePush } from '../actions/Navigation'
// import { updateBudgetItem, addBudgetItem } from '../actions/AnnualBudgets'

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Account)
