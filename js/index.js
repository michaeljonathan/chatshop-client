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
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Logic
import appReducers from './logic/reducers'
import link from './logic/link'

// Components
import App from './components/App'
import AboutPage from './components/AboutPage'
import LoginPage from './components/LoginPage'

// Style
import '../css/style.scss'



/*
 * Initialization
 */

// Logic
let createStoreWithMiddleware = applyMiddleware(
	thunk,
	link.middleware
)(createStore)

let combinedReducer = combineReducers(Object.assign({}, appReducers, {
	routing: routeReducer
}))

let browserHistory = createBrowserHistory()

let store = createStoreWithMiddleware(combinedReducer)

link.setStoreDispatcher(store.dispatch)
link.setTokenProvider(() => store.getState().linkToken)

syncReduxAndRouter(browserHistory, store) 

// Socket
link.connect('http://localhost:3005/chatshop')

// Components
let rootElement = document.querySelector('.content')

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App} />
			<Route path="/about" component={AboutPage} />
			<Route path="/login" component={LoginPage} />
		</Router>
	</Provider>,
	rootElement
)


/*
 * Testing one two
 */

import * as actions from './logic/actions'
window.actions = actions
window.store = store

function printState() {
	console.log('[state updated]', store.getState())
}

printState()
store.subscribe(function() {
	printState()
})
