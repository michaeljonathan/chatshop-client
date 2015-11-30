import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Conversation from '../Conversation'
import ThreadList from '../ThreadList'

class App extends Component {
	render() {
		const { dispatch } = this.props;
		return (
			<div className="App">
				<div className="App__mainContainer">
					<ThreadList threadList={this.props.threadList}></ThreadList>
					<Conversation></Conversation>
				</div>
				<div className="App_bar">
					{function() {
						return this.props.currentUser ?
							<p>Logged in as {this.props.currentUser}</p>
						:
							<p>Logged out</p>
					}.call(this)}
					<p>
						<Link to={`/about`}>About ChatShop</Link>
					</p>
				</div>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
		currentUser: state.currentUser,
		threadList: state.threadList.map(function(threadID) {
			return state.threads[threadID]
		})
	}
}

let InjectedAppComponent = connect(mapStateToInjectedProps)(App)

export default InjectedAppComponent;
