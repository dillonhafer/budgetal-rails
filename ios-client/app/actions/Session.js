import {
  SESSION_UPDATED,
} from '../constants/ActionTypes'

export function updateSessions(sessions) {
  return {
    type: SESSION_UPDATED,
    sessions,
  }
}
