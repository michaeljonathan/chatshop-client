import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Conversation from '../Conversation'
import ThreadList from '../ThreadList'

import { appSelector } from '../../logic/selectors'

class App extends Component {
	render() {
		const { dispatch, currentUser } = this.props
		return (
			<div className="App">
				<div className="App__mainContainer">
					<ThreadList></ThreadList>
					<Conversation></Conversation>
				</div>
				<div className="App__bar">
					{function() {
						return currentUser ?
							<p className="App__bar__identity">Logged in as {currentUser.name}</p>
						:
							<p className="App__bar__identity">Logged out</p>
					}.call(this)}
					<p className="App__bar__nav">
						<Link to={`/about`}>About ChatShop</Link>
					</p>
				</div>
			</div>
		)
	}
}

let InjectedAppComponent = connect(appSelector)(App)

export default InjectedAppComponent;
