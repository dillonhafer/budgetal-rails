import { connect } from 'react-redux'

import AccountInfoForm from '../components/AccountInfoForm'
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
    signOut: (r) => {
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
)(AccountInfoForm)
