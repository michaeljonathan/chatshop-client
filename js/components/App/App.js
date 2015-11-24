import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class App extends Component {
	render() {
		const { dispatch } = this.props;
		return (
			<div>
				<h1>Hi! This is App. :)</h1>
				<footer>
					{function() {
						return this.props.currentUser ?
							<p>Logged in as {this.props.currentUser}</p>
						:
							<p>Logged out</p>
					}.call(this)}
					<p>
						<Link to={`/about`}>About ChatShop</Link>
					</p>
				</footer>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
		currentUser: state.currentUser
	}
}

let InjectedAppComponent = connect(mapStateToInjectedProps)(App)

export default InjectedAppComponent;
