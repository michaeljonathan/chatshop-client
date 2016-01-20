import { pushPath } from 'redux-simple-router'

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RESPOND_LOGIN = 'RESPOND_LOGIN';

export const REQUEST_INITIAL_DATA = 'REQUEST_INITIAL_DATA';
export const RESPOND_INITIAL_DATA = 'RESPOND_INITIAL_DATA';

export const RECEIVE_THREAD = 'RECEIVE_THREAD';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const RECEIVE_USER = 'RECEIVE_USER';

export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

///////////
// Login //
///////////

export function requestLogin(credentials) {
	return {
		type: REQUEST_LOGIN,
		credentials: credentials
	}
}

export function respondLogin(status, error, user, linkToken) {
	return (dispatch, getState) => {

		// Update state (currentUser + linkToken, and/or LoginPage)
		dispatch({
			type: RESPOND_LOGIN,
			status: status,
			error: error,
			user: user,
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

export function respondInitialData(status, initialData) {
	return {
		type: RESPOND_INITIAL_DATA,
		status: status,
		initialData: initialData
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

//////////////
// Messages //
//////////////

export function receiveMessage(messageData) {
	return {
		type: RECEIVE_MESSAGE,
		messageData: messageData
	}
}

export function sendMessage(messageData) {
	return (dispatch, state) => {
		setTimeout(() => {
			console.log('async action timeout done');
		}, 1000);
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

export function setCurrentUser(userID) {
	return {
		type: SET_CURRENT_USER,
		userID: userID
	}
}

export function setCurrentThread(threadID) {
	return {
		type: SET_CURRENT_THREAD,
		threadID: threadID
	}
}
