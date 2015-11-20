import React, { Component } from 'react'
import { connect } from 'react-redux'

import { incrementCounter } from '../logic/actions'

class App extends Component {
	render() {
		const { dispatch, counter } = this.props;
		return (
			<div>
				<h1>Hi! This is App. :)</h1>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
		counter: state.counter
	}
}

let InjectedAppComponent = connect(mapStateToInjectedProps)(App)

export default InjectedAppComponent;
