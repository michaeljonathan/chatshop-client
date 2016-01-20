import { createSelector } from 'reselect'

const threadsIDsSelector = state => state.threadIDs
const threadsMapSelector = state => state.threadsMap
const messagesMapSelector = state => state.messagesMap
const usersMapSelector = state => state.usersMap
const currentUserIDselector = state => state.currentUserID
const uiLoginPageSelector = state => state.uiLoginPage
const uiAppSelector = state => state.uiApp

let messageContextDeriver = (message, threadsMap, usersMap) => {
	/* Message Prop */
	return {
		id: message.id,
		date: message.date,
		message: message.message,

		author: usersMap[message.authorID],
		thread: threadsMap[message.threadID]
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
	currentUserIDselector,
	(usersMap, currentUserID) => {
		return {
			currentUser: usersMap[currentUserID]
		}
	}
)

export const threadListSelector = createSelector(

	threadsIDsSelector,
	threadsMapSelector,
	messagesMapSelector,
	usersMapSelector,
	uiAppSelector,

	(threadIDs, threadsMap, messagesMap, usersMap, uiApp) => {

		return {
			threadList: threadIDs.map((threadID) => {

				let thread = threadsMap[threadID]

				let latestMessage = undefined
				if (thread.messageIDs.length) {
					latestMessage = messagesMap[thread.messageIDs[thread.messageIDs.length - 1]]
					latestMessage = messageContextDeriver(latestMessage, threadsMap, usersMap)
				}

				let unreadCount = 0
				if (thread.unreadSince && thread.messageIDs.length) {
					let indexOfUnreadMessage = thread.messageIDs.indexOf(thread.unreadSince)
					if (indexOfUnreadMessage >= 0) {
						unreadCount = thread.messageIDs.length - indexOfUnreadMessage - 1
					}
				}

				/* ThreadList->Thread Prop */
				switch (thread.type) {
					case 'group':
						return {
							id: thread.id,
							type: thread.type,
							title: thread.title,
							description: thread.description,

							latestMessage: latestMessage,
							isCurrent: thread.id == uiApp.currentThreadID,
							unreadCount: unreadCount
						}
					case 'personal':
						return {
							id: thread.id,
							type: thread.type,

							other: usersMap[thread.other],
							latestMessage: latestMessage,
							isCurrent: thread.id == uiApp.currentThreadID,
							unreadCount: unreadCount
						}
					default:
						break;
				}
			})
		}
	}
)

export const conversationSelector = createSelector(

	threadsIDsSelector,
	threadsMapSelector,
	messagesMapSelector,
	usersMapSelector,
	uiAppSelector,

	(threadIDs, threadsMap, messagesMap, usersMap, uiApp) => {

		if (!uiApp.currentThreadID) {
			return {thread: false}
		}
		if (!threadsMap[uiApp.currentThreadID]) {
			return {thread: false}
		}

		let thread = threadsMap[uiApp.currentThreadID];
		switch (thread.type) {
			case 'group':
				return {
					thread: {
						id: thread.id,
						type: thread.type,
						title: thread.title,
						description: thread.description,
						unreadSince: thread.unreadSince,

						messages: thread.messageIDs.map((messageID) => {
							return messageContextDeriver(messagesMap[messageID], threadsMap, usersMap)
						})
					}
				}
			case 'personal':
				return {
					thread: {
						id: thread.id,
						type: thread.type,
						unreadSince: thread.unreadSince,

						other: usersMap[thread.other],
						messages: thread.messageIDs.map((messageID) => {
							return messageContextDeriver(messagesMap[messageID], threadsMap, usersMap)
						})
					}
				}
			default:
				break;
		}
	}
)
