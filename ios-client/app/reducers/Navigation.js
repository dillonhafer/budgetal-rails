import * as NavigationStateUtils from 'NavigationStateUtils'

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
	children: [
		{ key: 'SignIn', title: '' },
	],
}

export default function navigationState(state = initialNavState, action) {
	switch (action.type) {
	case NAV_PUSH:
		if (state.children[state.index].key === (action.state && action.state.key)) return state
		return NavigationStateUtils.push(state, action.state)

	case NAV_POP:
		if (state.index === 0 || state.children.length === 1) return state
		return NavigationStateUtils.pop(state)

	case NAV_JUMP_TO_KEY:
		return NavigationStateUtils.jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return NavigationStateUtils.jumpToIndex(state, action.index)

	case NAV_REPLACE_AT_INDEX:
		return NavigationStateUtils.replaceAtIndex(state, action.index, action.newState)

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			children: action.children
		}
	default:
		return state
	}
}
