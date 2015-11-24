export const RECEIVE_THREAD = 'RECEIVE_THREAD';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const RECEIVE_USER = 'RECEIVE_USER';

export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

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