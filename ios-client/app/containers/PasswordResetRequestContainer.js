import { connect } from 'react-redux'

import PasswordResetRequest from '../components/PasswordResetRequest'
import { navigatePop } from '../actions/Navigation'

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    goBack: () => {
      dispatch(navigatePop());
    },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordResetRequest)
