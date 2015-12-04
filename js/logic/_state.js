/*
 * (Example) Single, global app state
 */

let state = {
	threadIDs: ['t1'],
	threadsMap: {
		t1:
			{
				id: 't1',
				type: 'group',
				title: 'Team Updates',
				description: 'Late? Sick? Leaving early? Post in here to let the team know.',
				participantIDs: ['u1'],
				messageIDs: ['m1'],
				unreadSince: 'm1'
			},
		t2:
			{
				id: 't2',
				type: 'personal',
				other: 'u2',
				messageIDs: ['m2'],
				unreadSince: false
			}
	},
	messagesMap: {
		m1: {
			id: 'm1',
			threadID: 't1',
			authorID: 'u1',
			date: 'Thu Dec 03 2015 12:00:00 GMT+1100 (AEDT)',
			message: 'Hi what\'s up everybody.'
		},
		m2: {...}
	},
	usersMap: {
		u1:
			{
				id: 'u1',
				name: 'MJ'
			},
		u2: {...}
	},
	currentUserID: 'u1',
	currentThreadID: 't1'
}

/*
 * (Example) Derived app state for App
 */

let appDerivedState = {
	currentUser: -> usersMap.u1
}

/*
 * (Example) Derived app state for ThreadList
 */

let threadListDerivedState = {
	threadList: [
		{
			id: 't1',
			type: 'group',
			title: 'Team Updates',
			description: 'Late? Sick? Leaving early? Post in here to let the team know.',

			latestMessage: {
				* messages.m1(selected) *
			},
			isCurrent: true,
			unreadCount: 20
		}
	]
}

/*
 * (Example) Derived app state for Conversation
 */

let conversationDerivedState = {
	thread: {
		id: 't1',
		type: 'group',
		title: 'Team Updates',
		description: 'Late? Sick? Leaving early? Post in here to let the team know.',
		unreadSince: 'm1',
		messages: [
			{
				* messages.m1(selected) *
			}
		]
	}
}

/*
 * (Example) Derived message object
 */

let messageSelected = {
	id: 'm1',
	date: 'Thu Dec 03 2015 12:00:00 GMT+1100 (AEDT)',
	message: 'Hi what\'s up everybody.',

	author: -> usersMap.u1,
	thread: -> threadsMap.t1
}