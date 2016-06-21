import { connect } from 'react-redux'
import Account from '../components/Account'
import { navigatePop, navigatePush } from '../actions/Navigation'
import { updateSessions } from '../actions/Session'
import { updateUser, StoreUser } from '../actions/Account'

const mapStateToProps = (state) => {
	const currentUser = state.accountState.currentUser;
	const sessions = state.sessionState.sessions;
	return {
		currentUser, sessions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
		updateSessions: (sessions) => {
			dispatch(updateSessions(sessions));
		},
		updatePhoto: (user) => {
			dispatch(navigatePush({key: 'PhotoForm', title: 'Edit Profile', user}))
		},
		updateUser: (user) => {
			StoreUser(user)
			dispatch(updateUser(user))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Account)
