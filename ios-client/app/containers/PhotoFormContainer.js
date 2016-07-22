import { connect } from 'react-redux'

import PhotoForm from '../components/PhotoForm'
import { navigatePop, navigatePush, navigateReset } from '../actions/Navigation'
import { updatePhoto, StoreUser } from '../actions/Account'

const mapStateToProps = (state) => {
	const user = state.navigationState.routes[state.navigationState.index].user || {avatar: ''};
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
		updatePhoto: (user) => {
			StoreUser(user)
			dispatch(updatePhoto(user.avatar));
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoForm)
