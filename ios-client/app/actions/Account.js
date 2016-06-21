import {
  ACCOUNT_PHOTO_UPDATED,
  ACCOUNT_USER_UPDATED,
} from '../constants/ActionTypes'
import { USER_KEY } from '../constants/StorageKeys'
import {AsyncStorage} from 'react-native'

export async function StoreUser(user) {
	try {
		AsyncStorage.mergeItem(USER_KEY, JSON.stringify(user));
	} catch(err) {
		console.log(err)
	}
}

export function updatePhoto(avatar) {
  return {
    type: ACCOUNT_PHOTO_UPDATED,
    avatar,
  }
}

export function updateUser(user) {
  return {
    type: ACCOUNT_USER_UPDATED,
    user,
  }
}
