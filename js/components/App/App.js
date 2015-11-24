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
					<Link to={`/about`}>About ChatShop</Link>
				</footer>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
	}
}

let InjectedAppComponent = connect(mapStateToInjectedProps)(App)

export default InjectedAppComponent;
