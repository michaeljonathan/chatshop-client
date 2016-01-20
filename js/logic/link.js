import socketIoClient from 'socket.io-client'

import { REQUEST_LOGIN, respondLogin } from './actions'

/*
 * General config
 */

// Default payload that gets sent with every request
let _defaultPayload = {
	appVersion: '1'
}

// Event name for socket.io
let _EVENTNAME = 'coffee'



/*
 * socket.io WebSocket - the connection to the server
 */
let _webSocket = false

let _storeDispatcher = false



/*
 * Send a payload to the server (must connect WebSocket first)
 */
let _send = (payload) => {
	console.log('Link Middleware Emitting: ' + payload.action)

	if (!_webSocket) {
		console.error('Link Middleware: Failed to emit - not connected')
		return
	}

	_webSocket.emit(_EVENTNAME, Object.assign({}, _defaultPayload, payload))
}



/*
 * Client-to-Server API - Translates a redux action object to a payload according to the API
 */
let _translateActionToRequestPayload = (action) => {
	switch (action.type) {
		case REQUEST_LOGIN:
			return {
				action: 'login-req',
				credentials: {
					username: action.credentials.username,
					password: action.credentials.password
				}
			}
			break
		default:
			return false;
			break
	}
}



/*
 * Server-to-Client API - Translates a server-given message to a redux action object
 */
let _translateResponsePayloadToAction = (payload) => {
	switch (payload.action) {
		case 'login-res':
			return respondLogin(payload.status, payload.user)
			break
		case 'meta':
		default:
			return false
	}
}



/*
 * Connect to the server
 *     Inspects every message from the server and dispatches an action if one is applicable for the payload
 */
let connect = (endpoint) => {

	// Establish connection
	_webSocket = socketIoClient(endpoint)

	// Listen for messages
	_webSocket.on(_EVENTNAME, function(data) {
		console.log('Link Middleware Received: ', data)
		if (_storeDispatcher) {
			let action = _translateResponsePayloadToAction(data)
			if (action) {
				_storeDispatcher(action)
			} else {
				console.log('Link Middleware does not recognize the data.')
			}
		}
	})
}


/*
 * Middleware (to be attached to the redux store)
 * Inspects every dispatched action and sends a payload if one is applicable for the action
 */
let middleware = store => next => action => {
	let payload = _translateActionToRequestPayload(action)
	if (payload) {
		_send(payload)
	}
	return next(action)
}



/*
 * Set store dispatcher for dispatching actions generated from server payloads
 */
let setStoreDispatcher = (storeDispatcher) => {
	_storeDispatcher = storeDispatcher
}



export default {
	connect,
	middleware,
	setStoreDispatcher
}
