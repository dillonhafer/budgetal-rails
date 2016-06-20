import { connect } from 'react-redux'

import Account from '../components/Account'
import { navigatePop, navigatePush } from '../actions/Navigation'
import { updateSessions } from '../actions/Session'

const mapStateToProps = (state) => {
	const sessions = state.sessionState.sessions
	return {
		sessions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
		updateSessions: (sessions) => {
			dispatch(updateSessions(sessions));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Account)
