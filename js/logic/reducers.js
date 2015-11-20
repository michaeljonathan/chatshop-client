import { combineReducers } from 'redux'

import * as actions from './actions'

let exampleAppState = {
	threadList: ['t3', 't5', 't1', 't2', 't4'],
	threads: {
		t1:
			{
				id: 't1',
				type: 'group',
				title: 'Team Updates',
				description: 'Late? Sick? Leaving early? Post in here to let the team know.',
				participants: ['u1', 'u2', 'u3', 'u4'],
				messageList: ['m1', 'm2', 'm3', 'm4'],
				messages: {
					m1: {
						id: 'm1',
						threadID: 't1',
						author: 'u1',
						message: 'Hi what\'s up everybody.'
					},
					m2: {
						id: 'm2',
						threadID: 't1',
						author: 'u2',
						message: 'Eating donuts!'
					},
					m3: {
						id: 'm3',
						threadID: 't1',
						author: 'u4',
						message: 'Emily Heat'
					},
					m4: {
						id: 'm4',
						threadID: 't1',
						author: 'u4',
						message: 'Ben\'s on heat'
					}
				}
			},
		t2:
			{
				id: 't2',
				type: 'personal',
				otherUser: 'u2',
				messageList: ['m5'],
				messages: {
					m5: {
						id: 'm5',
						threadID: 't2',
						author: 'u1',
						message: 'G\'day ipsum dolor sit amet!'
					}
				}
			}
	},
	users: {
		u1:
			{
				id: 'u1',
				name: 'MJ'
			},
		u2:
			{
				id: 'u2',
				name: 'Florence Brown'
			},
		u3:
			{
				id: 'u3',
				name: 'Ben Crowe'
			},
		u4:
			{
				id: 'u4',
				name: 'Sophie Hargrave'
			}
	},
	currentUser: 'u1',
	currentThread: 't1'
}

function threadList(threadList = [], action) {
	switch (action.type) {
		case actions.RECEIVE_THREAD:
			return [action.threadData.id, ...threadList]
		default: 
			return threadList
	}
}

function threads(threads = {}, action) {
	switch (action.type) {
		case actions.RECEIVE_THREAD:
			return Object.assign({}, threads, {
				[action.threadData.id]: action.threadData
			})
		case actions.RECEIVE_MESSAGE:
			var messageData = action.messageData;
			var threadID = messageData.threadID;
			var thread = threads[threadID];
			return Object.assign({}, threads, {
				[threadID]: Object.assign({}, thread, {
					messageList: [...(thread.messageList), messageData.id],
					messages: Object.assign({}, thread.messages, {
						[messageData.id]: messageData
					})
				}) 
			})
		default: 
			return threads
	}
}

function users(users = {}, action) {
	switch (action.type) {
		case actions.RECEIVE_USER:
			return Object.assign({}, users, {
				[action.userData.id]: action.userData
			})
		default: 
			return users
	}
}

function currentUser(currentUser = false, action) {
	switch (action.type) {
		case actions.SET_CURRENT_USER:
			return action.userID
		default: 
			return currentUser
	}
}

function currentThread(currentThread = false, action) {
	switch (action.type) {
		case actions.SET_CURRENT_THREAD:
			return action.threadID
		default: 
			return currentThread
	}
}

export default combineReducers({
	threadList,
	threads,
	users,
	currentUser,
	currentThread
})
