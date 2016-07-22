import {
  push,
  pop,
  jumpTo,
  jumpToIndex,
  replaceAtIndex,
} from 'NavigationStateUtils'

import {
  NAV_PUSH,
  NAV_POP,
  NAV_JUMP_TO_KEY,
  NAV_JUMP_TO_INDEX,
  NAV_RESET,
  NAV_REPLACE_AT_INDEX,
} from '../constants/ActionTypes'

const initialNavState = {
	key: 'MainNavigation',
	index: 0,
	routes: [
		{ key: 'SignIn', title: '' },
	],
}

export default function navigationState(state = initialNavState, action) {
	switch (action.type) {
	case NAV_PUSH:
		if (state.routes[state.index].key === (action.state && action.state.key)) return state
		return push(state, action.state)

	case NAV_POP:
		if (state.index === 0 || state.routes.length === 1) return state
		return pop(state)

	case NAV_JUMP_TO_KEY:
		return jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return jumpToIndex(state, action.index)

	case NAV_REPLACE_AT_INDEX:
		return replaceAtIndex(state, action.index, action.newState)

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			routes: action.routes
		}
	default:
		return state
	}
}
