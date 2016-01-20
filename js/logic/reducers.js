import * as actions from './actions'

function threadIDs(threadIDs = [], action) {
	switch (action.type) {
		case actions.RECEIVE_THREAD:
			return [action.threadData.id, ...threadIDs]
		default: 
			return threadIDs
	}
}

function threadsMap(threadsMap = {}, action) {
	switch (action.type) {
		case actions.RECEIVE_THREAD:
			return Object.assign({}, threadsMap, {
				[action.threadData.id]: action.threadData
			})
		case actions.RECEIVE_MESSAGE:
			var messageData = action.messageData;
			var threadID = messageData.threadID;
			var thread = threadsMap[threadID];
			return Object.assign({}, threadsMap, {
				[threadID]: Object.assign({}, thread, {
					messageIDs: [...(thread.messageIDs), messageData.id],
					unreadSince: thread.unreadSince || messageData.id
				})
			})
		default: 
			return threadsMap
	}
}

function messagesMap(messagesMap = {}, action) {
	switch (action.type) {
		case actions.RECEIVE_MESSAGE:
			var messageData = action.messageData;
			return Object.assign({}, messagesMap, {
				[messageData.id]: messageData
			})
		default:
			return messagesMap;
	}
}

function usersMap(usersMap = {}, action) {
	switch (action.type) {
		case actions.RECEIVE_USER:
			return Object.assign({}, usersMap, {
				[action.userData.id]: action.userData
			})
		case actions.RESPOND_LOGIN:
			return (action.status == 'ok') ? Object.assign({}, usersMap, {
				[action.user.id]: action.user
			}) : usersMap
		default: 
			return usersMap
	}
}

function currentUserID(currentUserID = false, action) {
	switch (action.type) {
		case actions.SET_CURRENT_USER:
			return action.userID
		case actions.RESPOND_LOGIN:
			return (action.status == 'ok') ? action.user.id : currentUserID
		default: 
			return currentUserID
	}
}

function currentThreadID(currentThreadID = false, action) {
	switch (action.type) {
		case actions.SET_CURRENT_THREAD:
			return action.threadID
		default: 
			return currentThreadID
	}
}

export default {
	threadIDs,
	threadsMap,
	messagesMap,
	usersMap,
	currentUserID,
	currentThreadID
}
