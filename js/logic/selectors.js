import { createSelector } from 'reselect'

const threadKeysSelector = state => state.threadKeys
const threadsMapSelector = state => state.threadsMap
const messagesMapSelector = state => state.messagesMap
const usersMapSelector = state => state.usersMap
const currentUserKeySelector = state => state.currentUserKey
const uiLoginPageSelector = state => state.uiLoginPage
const uiAppSelector = state => state.uiApp

let messageContextDeriver = (message, threadsMap, usersMap) => {
	/* Message Prop */
	return {
		id: message.id,
		key: message.key,
		date: message.date,
		message: message.message,
		isSending: message.isSending,

		author: usersMap[message.authorKey],
		thread: threadsMap[message.threadKey]
	}
}

export const loginPageSelector = createSelector(
	uiLoginPageSelector,
	(uiLoginPage) => {
		return {
			error: uiLoginPage.error
		}
	}
)

export const appSelector = createSelector(
	usersMapSelector,
	currentUserKeySelector,
	(usersMap, currentUserKey) => {
		return {
			currentUser: usersMap[currentUserKey]
		}
	}
)

export const threadListSelector = createSelector(

	threadKeysSelector,
	threadsMapSelector,
	messagesMapSelector,
	usersMapSelector,
	currentUserKeySelector,
	uiAppSelector,

	(threadKeys, threadsMap, messagesMap, usersMap, currentUserKey, uiApp) => {

		let props = {
			threadList: false,
			currentUser: currentUserKey ? usersMap[currentUserKey] : false
		}

		props.threadList = threadKeys.map((threadKey) => {

			let thread = threadsMap[threadKey]

			let latestMessage
			if (thread.messageKeys.length) {
				latestMessage = messagesMap[thread.messageKeys[thread.messageKeys.length - 1]]
				latestMessage = messageContextDeriver(latestMessage, threadsMap, usersMap)
			}

			let unreadCount = 0
			if (thread.unreadSince && thread.messageKeys.length) {
				let indexOfUnreadMessage = thread.messageKeys.indexOf(thread.unreadSince)
				if (indexOfUnreadMessage >= 0) {
					unreadCount = thread.messageKeys.length - indexOfUnreadMessage - 1
				}
			}

			/* ThreadList->Thread Prop */
			switch (thread.type) {
				case 'group':
					return {
						key: thread.key,
						type: thread.type,
						title: thread.title,
						description: thread.description,

						latestMessage,
						unreadCount,

						isCurrent: thread.key == uiApp.currentThreadKey
					}
				case 'personal':
					return {
						key: thread.key,
						type: thread.type,
						other: usersMap[thread.otherKey],

						latestMessage,
						unreadCount,

						isCurrent: thread.key == uiApp.currentThreadKey
					}
				default:
					break;
			}
		})

		return props
	}
)

export const conversationSelector = createSelector(

	threadKeysSelector,
	threadsMapSelector,
	messagesMapSelector,
	usersMapSelector,
	currentUserKeySelector,
	uiAppSelector,

	(threadKeys, threadsMap, messagesMap, usersMap, currentUserKey, uiApp) => {

		let props = {
			thread: false,
			currentUser: currentUserKey ? usersMap[currentUserKey] : false
		}

		if (uiApp.currentThreadKey && threadsMap[uiApp.currentThreadKey]) {
			let thread = threadsMap[uiApp.currentThreadKey];
			switch (thread.type) {
				case 'group':
					props.thread = {
						id: thread.id,
						key: thread.key,
						type: thread.type,
						title: thread.title,
						description: thread.description,
						unreadSince: thread.unreadSince,

						messages: thread.messageKeys.map((messageKey) => {
							return messageContextDeriver(messagesMap[messageKey], threadsMap, usersMap)
						})
					}
					break;
				case 'personal':
					props.thread = {
						id: thread.id,
						key: thread.key,
						type: thread.type,
						unreadSince: thread.unreadSince,

						other: usersMap[thread.otherKey],
						messages: thread.messageKeys.map((messageKey) => {
							return messageContextDeriver(messagesMap[messageKey], threadsMap, usersMap)
						})
					}
					break;
				default:
					break;
			}
		}

		return props
	}
)
