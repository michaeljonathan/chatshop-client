/*
 * Imports
 */

// Libraries
import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import socketIoClient from 'socket.io-client'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Logic
import appReducers from './logic/reducers'

// Components
import App from './components/App'
import AboutPage from './components/AboutPage'

// Style
import '../css/app.scss'



/*
 * Initialization
 */

// Logic
let createStoreWithMiddleware = applyMiddleware(
	thunk
)(createStore)

let combinedReducer = combineReducers(Object.assign({}, appReducers, {
	routing: routeReducer
}))

let browserHistory = createBrowserHistory()

let store = createStoreWithMiddleware(combinedReducer)

syncReduxAndRouter(browserHistory, store) 

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
		<Router history={browserHistory}>
			<Route path="/" component={App} />
			<Route path="/about" component={AboutPage} />
		</Router>
	</Provider>,
	rootElement
)


/*
 * Testing one two
 */

window.store = store;
window.actions = actions;

function printState() {
	console.log(store.getState());
}

printState();
store.subscribe(function() {
	printState();
});

import * as actions from './logic/actions'

store.dispatch(actions.receiveUser({
	id: 'u1',
	name: 'MJ'
}));
store.dispatch(actions.receiveUser({
	id: 'u2',
	name: 'Florence Brown'
}));
store.dispatch(actions.receiveThread({
	id: 't1',
	type: 'group',
	title: 'Team Updates',
	description: 'Late? Sick? Leaving early? Post in here to let the team know.',
	participantIDs: ['u1'],
	messageIDs: [],
	unreadSince: false
}));
store.dispatch(actions.receiveMessage({
	id: 'm1',
	threadID: 't1',
	authorID: 'u1',
	date: 'Thu Dec 03 2015 12:00:00 GMT+1100 (AEDT)',
	message: 'Hi what\'s up everybody.'
}));
store.dispatch(actions.receiveMessage({
	id: 'm2',
	threadID: 't1',
	authorID: 'u2',
	date: 'Thu Dec 03 2015 12:01:00 GMT+1100 (AEDT)',
	message: 'Hey!!'
}));
store.dispatch(actions.setCurrentUser('u1'));
store.dispatch(actions.setCurrentThread('t1'));
store.dispatch(actions.sendMessage({}));

