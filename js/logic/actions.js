import { pushPath } from 'redux-simple-router'
import shortid from 'shortid'

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RESPOND_LOGIN = 'RESPOND_LOGIN';

export const REQUEST_INITIAL_DATA = 'REQUEST_INITIAL_DATA';
export const RESPOND_INITIAL_DATA = 'RESPOND_INITIAL_DATA';

export const RECEIVE_THREAD = 'RECEIVE_THREAD';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REQUEST_SEND_MESSAGE = 'REQUEST_SEND_MESSAGE';
export const RESPOND_SEND_MESSAGE = 'RESPOND_SEND_MESSAGE';

export const RECEIVE_USER = 'RECEIVE_USER';

export const COMPOSER_UPDATE_DRAFT = 'COMPOSER_UPDATE_DRAFT';

export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

///////////////
// Utilities //
///////////////

// Create new key (client-side ID) for an item
let newKey = function() {
	return shortid()
}

///////////
// Login //
///////////

export function requestLogin(credentials) {
	return {
		type: REQUEST_LOGIN,
		credentials: credentials
	}
}

export function respondLoginAsync(status, error, user, linkToken) {
	return (dispatch, getState) => {

		// Update state (currentUser + linkToken, and/or LoginPage)
		dispatch({
			type: RESPOND_LOGIN,
			status: status,
			error: error,
			user: Object.assign({}, user, { key: newKey() }),
			linkToken: linkToken
		})

		// Navigate to home
		if (status == 'ok') {
			dispatch(pushPath('/'))
		}

		// Request initial data
		if (status == 'ok') {
			dispatch(requestInitialData())
		}
	}
}

//////////////////
// Initial Data //
//////////////////

export function requestInitialData() {
	return (dispatch, getState) => {
		const { linkToken } = getState()
		dispatch({
			type: REQUEST_INITIAL_DATA,
			linkToken: linkToken
		})
	}
}

export function respondInitialDataAsync(status, error, initialData) {

	return (dispatch, getState) => {

		if (status == 'ok' && initialData) {

			// Get state
			let currentState = getState()
			let currentUser = currentState.usersMap[currentState.currentUserKey]

			// Copy intialData object
			initialData = Object.assign({}, initialData)

			// Prepare mappings
			let usersMap = {}
			let threadsMap = {}

			// Add keys
			if (initialData.users) {
				initialData.users = initialData.users.map(user => {
					let keyedUser = Object.assign({}, user, {
						key: newKey()
					})
					usersMap[user.id] = keyedUser

					// Btw this is the currently logged in user, update that state too
					if (currentUser.id == keyedUser.id) {
						dispatch(setCurrentUser(keyedUser.key))
					}

					return keyedUser
				})
			}
			if (initialData.threads) {
				initialData.threads = initialData.threads.map(thread => {
					let keyedThread = Object.assign({}, thread, {
						key: newKey(),
						messageKeys: []
					})
					if (thread.participantIDs) {
						keyedThread.participantKeys = thread.participantIDs.map(id => usersMap[id].key)
					}
					if (thread.other) {
						keyedThread.otherKey = usersMap[thread.other].key
					}
					threadsMap[thread.id] = keyedThread
					return keyedThread
				})
			}
			if (initialData.messages) {
				initialData.messages = initialData.messages.map(message => {
					let keyedMessage = Object.assign({}, message, {
						key: newKey(),
						threadKey: threadsMap[message.threadID].key,
						authorKey: usersMap[message.authorID].key
					})
					return keyedMessage
				})
			}
		}

		return dispatch({
			type: RESPOND_INITIAL_DATA,
			status: status,
			error: error,
			initialData: initialData
		})
	}
}

/////////////
// Threads //
/////////////

export function receiveThread(threadData) {
	return {
		type: RECEIVE_THREAD,
		threadData: threadData
	}
}

export function composerUpdateDraft(thread, messageText) {
	return {
		type: COMPOSER_UPDATE_DRAFT,
		thread,
		messageText
	}
}

//////////////
// Messages //
//////////////

export function receiveMessage(messageData) {
	return {
		type: RECEIVE_MESSAGE,
		messageData: messageData
	}
}

export function requestSendMessage(thread, messageAuthor, messageText) {
	return {
		type: REQUEST_SEND_MESSAGE,
		thread: thread,
		messageKey: newKey(),
		messageAuthor: messageAuthor,
		messageText: messageText
	}
}

export function respondSendMessageAsync(status, error, messageKey) {
	return (dispatch, getState) => {
		dispatch({
			type: RESPOND_SEND_MESSAGE,
			status: status,
			error: error,
			messageKey: messageKey
		})
	}
}

///////////
// Users //
///////////

export function receiveUser(userData) {
	return {
		type: RECEIVE_USER,
		userData: userData
	}
}

////////////////////
// App Management //
////////////////////

export function setCurrentUser(userKey) {
	return {
		type: SET_CURRENT_USER,
		userKey: userKey
	}
}

export function setCurrentThread(threadKey) {
	return {
		type: SET_CURRENT_THREAD,
		threadKey: threadKey
	}
}
