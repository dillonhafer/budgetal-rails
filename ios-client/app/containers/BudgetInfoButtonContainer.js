import { connect } from 'react-redux'

import BudgetInfoButton from '../components/BudgetInfoButton'
import { navigatePush } from '../actions/Navigation'

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
		showBudgetInfo: () => {
			dispatch(navigatePush({key: 'BudgetInfo', title: 'Budget Info'}))
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetInfoButton)
