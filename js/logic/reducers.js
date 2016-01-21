import * as actions from './actions'

function threadIDs(threadIDs = [], action) {
	switch (action.type) {
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.threads) {
				return action.initialData.threads.map(thread => thread.id)
			}
			return threadIDs
		case actions.RECEIVE_THREAD:
			return [action.threadData.id, ...threadIDs]
		default: 
			return threadIDs
	}
}

function threadsMap(threadsMap = {}, action) {
	switch (action.type) {
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.threads) {
				let threadsMap = action.initialData.threads.reduce((threadsMap, thread) => {
					threadsMap[thread.id] = thread
					return threadsMap
				}, {})
				if (action.initialData.messages) {
					action.initialData.messages.map(message => {
						(threadsMap[message.threadID]).messageIDs.push(message.id)
					})
				}
				return threadsMap
			}
			return threadsMap
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
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.messages) {
				return action.initialData.messages.reduce((messagesMap, message) => {
					messagesMap[message.id] = message
					return messagesMap
				}, messagesMap)
			}
			return messagesMap
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
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.users) {
				return action.initialData.users.reduce((usersMap, user) => {
					usersMap[user.id] = user
					return usersMap
				}, usersMap)
			}
			return usersMap
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

function linkToken(linkToken = false, action) {
	switch (action.type) {
		case actions.RESPOND_LOGIN:
			return (action.status == 'ok') ? action.linkToken : linkToken
		default: 
			return linkToken
	}
}

function uiLoginPage(uiLoginPage = {
	error: false
}, action) {
	switch (action.type) {
		case actions.RESPOND_LOGIN:
			return Object.assign({}, uiLoginPage, { error: action.error ? action.error : false })
		default:
			return uiLoginPage
	}
}

function uiApp(uiApp = {
	currentThreadID: false
}, action) {
	switch (action.type) {
		case actions.SET_CURRENT_THREAD:
			return Object.assign({}, uiApp, { currentThreadID: action.threadID })
		default:
			return uiLoginPage
	}
}

export default {
	threadIDs,
	threadsMap,
	messagesMap,
	usersMap,
	currentUserID,
	linkToken,
	uiLoginPage,
	uiApp
}
