import { createSelector } from 'reselect'

const stateSelector = state =>
	state

const currentUserSelector = state =>
	state.currentUser

const threadListSelector = state =>
	state.threadList.map(threadID => state.threads[threadID])

function messageContextInjector(message, state) {
	if (message) {
		if (message.threadID) {
			message.thread = state.threads[message.threadID]
		}
		if (message.authorID) {
			message.author = state.users[message.authorID]
		}
	}
	return message;
}

const threadListDerivedSelector = createSelector(
	threadListSelector,
	stateSelector,
	(threadList, state) => {
		return threadList.map(thread => {
			let latestMessage = undefined;
			if (thread.messageList.length) {
				latestMessage = thread.messages[thread.messageList[thread.messageList.length - 1]]
				latestMessage = messageContextInjector(latestMessage, state)
			}

			return Object.assign(thread, {
				latestMessage
			})
		})
	}
)

export const AppSelector = createSelector(
	currentUserSelector,
	threadListDerivedSelector,
	(currentUser, threadListDerived) => {
		return {
			currentUser,
			threadList: threadListDerived
		}
	}
)

