import { connect } from 'react-redux'

import PasswordReset from '../components/PasswordReset'
import { navigateReset } from '../actions/Navigation'

const mapStateToProps = (state) => {
  const password_reset_token = state.navigationState.routes[state.navigationState.index].password_reset_token || '';
	return {password_reset_token}
}

const mapDispatchToProps = (dispatch) => {
	return {
    goBack: () => {
      dispatch(navigateReset([{key: 'SignIn', title: ''}],0))
    },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordReset)
