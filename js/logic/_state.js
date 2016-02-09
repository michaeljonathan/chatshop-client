/*
 * (Example) Single, global app state
 */

let state = {
	threadKeys: ['t1--abc', 't2--abc'],
	threadsMap: {
		t1--abc:
			{
				id: 't1', // not important?
				key: 't1--abc',
				type: 'group',
				title: 'Team Updates',
				description: 'Late? Sick? Leaving early? Post in here to let the team know.',
				participantIDs: ['u1'], // not important?
				participantKeys: ['u1--abc'],
				messageKeys: ['m1--abc'],
				unreadSince: 'm1--abc',
				messageDraft: 'Lorem ipsum'
			},
		t2--abc:
			{
				id: 't2', // not important?
				key: 't2--abc',
				type: 'personal',
				other: 'u2', // not important?
				otherKey: 'u2--abc',
				messageKeys: ['m2--abc'],
				unreadSince: false,
				messageDraft: ''
			}
	},
	messagesMap: {
		m1--abc: {
			id: 'm1', // not important?
			key: 'm1--abc',
			threadID: 't1', // not important?
			threadKey: 't1--abc',
			authorID: 'u1', // not important?
			authorKey: 'u1--abc',
			date: 'Thu Dec 03 2015 12:00:00 GMT+1100 (AEDT)',
			message: 'Hi what\'s up everybody.',
			isSending: false
		},
		m2--abc: {...}
	},
	usersMap: {
		u1--abc:
			{
				id: 'u1', // not important?
				key: 'u1--abc',
				name: 'MJ'
			},
		u2--abc: {...}
	},

	currentUserKey: 'u1--abc',
	linkToken: 't0ken',

	uiLoginPage: {
		error: 'invalid-credentials'
	},
	uiApp: {
		currentThreadKey: 't1--abc'
	}
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
				* messages.m1(derived) *
			},
			isCurrent: true,
			unreadCount: 20
		},
		{
			id: 't2',
			type: 'personal',

			other: -> usersMap.u2--abc
			latestMessage: {
				* messages.m2(derived) *
			},
			isCurrent: false,
			unreadCount: 20
		}
	]
}

/*
 * (Example) Derived app state for Conversation
 */

let conversationDerivedState = {
	thread: {
		key: 't1--abc',
		type: 'group',
		title: 'Team Updates',
		description: 'Late? Sick? Leaving early? Post in here to let the team know.',
		unreadSince: 'm1--abc',
		messages: [
			{
				* messages.m1--abc(derived) *
			}
		]
	}
}

/*
 * (Example) Derived message object
 */

let messageDerived = {
	key: 'm1--abc',
	date: 'Thu Dec 03 2015 12:00:00 GMT+1100 (AEDT)',
	message: 'Hi what\'s up everybody.',

	author: -> usersMap.u1--abc,
	thread: -> threadsMap.t1--abc
}