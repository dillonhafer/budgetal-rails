import {
  ACCOUNT_PHOTO_UPDATED,
  ACCOUNT_USER_UPDATED,
} from '../constants/ActionTypes'

import {MISSING_PROFILE} from '../images/missingProfile'

const initialAccountState = {
	key: 'Sessions',
	currentUser: {
    first_name: '---',
    last_name: '',
    email: '---',
    avatar: MISSING_PROFILE,
  },
}

export default function accountState(state = initialAccountState, action) {
	switch (action.type) {
  	case ACCOUNT_USER_UPDATED:
  		return {
  			...state,
        currentUser: action.user,
  		}
    case ACCOUNT_PHOTO_UPDATED:
      const user = Object.assign({}, state.currentUser, {avatar: action.avatar})
  		return {
  			...state,
        currentUser: user,
  		}
    default:
  		return state
	}
}
