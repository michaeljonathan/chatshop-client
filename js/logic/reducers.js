import * as actions from './actions'

function threadKeys(threadKeys = [], action) {
	switch (action.type) {
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.threads) {
				return action.initialData.threads.map(thread => thread.key)
			}
			return threadKeys
		case actions.RECEIVE_THREAD:
			return [action.threadData.key, ...threadKeys]
		default: 
			return threadKeys
	}
}

function threadsMap(threadsMap = {}, action) {
	switch (action.type) {
		case actions.RESPOND_INITIAL_DATA:
			if (action.status == 'ok' && action.initialData && action.initialData.threads) {
				let threadsMap = action.initialData.threads.reduce((threadsMap, thread) => {
					threadsMap[thread.key] = thread
					return threadsMap
				}, {})
				if (action.initialData.messages) {
					action.initialData.messages.map(message => {
						(threadsMap[message.threadKey]).messageKeys.push(message.key)
					})
				}
				return threadsMap
			}
			return threadsMap
		case actions.RECEIVE_THREAD:
			return Object.assign({}, threadsMap, {
				[action.threadData.key]: action.threadData
			})
		case actions.RECEIVE_MESSAGE:
			var messageData = action.messageData;
			var threadKey = messageData.threadKey;
			var thread = threadsMap[threadKey];
			return Object.assign({}, threadsMap, {
				[threadKey]: Object.assign({}, thread, {
					messageKeys: [...(thread.messageKeys), messageData.key],
					unreadSince: thread.unreadSince || messageData.key
				})
			})
		case actions.REQUEST_SEND_MESSAGE:
			var thread = threadsMap[action.thread.key];
			return Object.assign({}, threadsMap, {
				[thread.key]: Object.assign({}, thread, {
					messageKeys: [...(thread.messageKeys), action.messageKey]
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
					messagesMap[message.key] = Object.assign({}, message, {
						isSending: false
					})
					return messagesMap
				}, {})
			}
			return messagesMap
		case actions.RECEIVE_MESSAGE:
			var messageData = action.messageData;
			return Object.assign({}, messagesMap, {
				[messageData.key]: messageData
			})
		case actions.REQUEST_SEND_MESSAGE:
			var messageData = {
				id: '-',
				key: action.messageKey,
				threadID: action.thread.id,
				threadKey: action.thread.key,
				authorID: action.messageAuthor.id,
				authorKey: action.messageAuthor.key,
				date: (new Date()).toString(),
				message: action.messageText,
				isSending: true
			}
			return Object.assign({}, messagesMap, {
				[messageData.key]: messageData
			})
		case actions.RESPOND_SEND_MESSAGE:
			return Object.assign({}, messagesMap, {
				[action.messageKey]:  Object.assign({}, messagesMap[action.messageKey], {
					isSending: false
				})
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
					usersMap[user.key] = user
					return usersMap
				}, {})
			}
			return usersMap
		case actions.RECEIVE_USER:
			return Object.assign({}, usersMap, {
				[action.userData.key]: action.userData
			})
		case actions.RESPOND_LOGIN:
			return (action.status == 'ok') ? Object.assign({}, usersMap, {
				[action.user.key]: action.user
			}) : usersMap
		default: 
			return usersMap
	}
}

function currentUserKey(currentUserKey = false, action) {
	switch (action.type) {
		case actions.SET_CURRENT_USER:
			return action.userKey
		case actions.RESPOND_LOGIN:
			return (action.status == 'ok') ? action.user.key : currentUserKey
		default:
			return currentUserKey
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
	currentThreadKey: false
}, action) {
	switch (action.type) {
		case actions.SET_CURRENT_THREAD:
			return Object.assign({}, uiApp, { currentThreadKey: action.threadKey })
		default:
			return uiApp
	}
}

export default {
	threadKeys,
	threadsMap,
	messagesMap,
	usersMap,
	currentUserKey,
	linkToken,
	uiLoginPage,
	uiApp
}
