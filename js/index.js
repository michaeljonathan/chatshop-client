/*
 * Imports
 */

// Libraries
import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import socketIoClient from 'socket.io-client'

// Logic
import reducer from './logic/reducers'

// Components
import App from './components/App'

// Style
import '../css/app.scss'



/*
 * Initialization
 */

// Logic
const createStoreWithMiddleware = applyMiddleware(
	thunk
)(createStore)

let store = createStoreWithMiddleware(reducer)

// Socket
var webSocket = socketIoClient('http://localhost:3005')
webSocket.emit('CLIENT_ARRIVED', {
	name: 'User 1'
})
webSocket.on('NOTIFICATION', function(data) {
	console.log('Notification received:');
	console.log(data);
})

// Components
let rootElement = document.querySelector('.content')

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
)


/*
 * Testing one two
 */

window.store = store;

function printState() {
	console.log(store.getState());
}

printState();
store.subscribe(function() {
	printState();
});

import * as actions from './logic/actions'

store.dispatch(actions.setCurrentUser('u1'));
store.dispatch(actions.setCurrentThread('t1'));
store.dispatch(actions.receiveUser({
	id: 'u1',
	name: 'MJ'
}));
store.dispatch(actions.receiveThread({
	id: 't1',
	type: 'group',
	title: 'Team Updates',
	description: 'Late? Sick? Leaving early? Post in here to let the team know.',
	participants: ['u1', 'u2', 'u3', 'u4'],
	messageList: [],
	messages: {}
}));
store.dispatch(actions.receiveMessage({
	id: 'm1',
	threadID: 't1',
	author: 'u1',
	message: 'Hi what\'s up everybody.'
}));
store.dispatch(actions.receiveMessage({
	id: 'm2',
	threadID: 't1',
	author: 'u2',
	message: 'Eating donuts!'
}));
store.dispatch(actions.sendMessage({}));

