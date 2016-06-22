import { connect } from 'react-redux'

import ChangePasswordForm from '../components/ChangePasswordForm'
import { navigatePop } from '../actions/Navigation'
import { updateUser } from '../actions/Account'

const mapStateToProps = (state) => {
  const user = state.accountState.currentUser;
	return {
		user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
    goBack: () => {
      dispatch(navigatePop());
    },
		updateUser: (user) => {
			dispatch(updateUser(user));
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePasswordForm)
