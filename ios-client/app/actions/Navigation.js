import {
  NAVIGATE,
  NAV_PUSH,
  NAV_POP,
  NAV_JUMP_TO_KEY,
  NAV_JUMP_TO_INDEX,
  NAV_RESET,
  NAV_REPLACE_AT_INDEX,
} from '../constants/ActionTypes'

export function navigatePush(state) {
	state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: NAV_PUSH,
		state
	}
}

export function navigatePop() {
	return {
		type: NAV_POP
	}
}

export function navigateJumpToKey(key) {
	return {
		type: NAV_JUMP_TO_KEY,
		key
	}
}

export function navigateJumpToIndex(index) {
	return {
		type: NAV_JUMP_TO_INDEX,
		index
	}
}

export function navigateReplaceAtIndex(index, newState) {
	return {
		type: NAV_REPLACE_AT_INDEX,
		index,
		newState
	}
}

export function navigateReset(children, index) {
	return {
		type: NAV_RESET,
		index,
		children
	}
}
