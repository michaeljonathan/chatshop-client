import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class AboutPage extends Component {
	render() {
		const { dispatch, counter } = this.props;
		return (
			<div>
				<h2>AboutPage</h2>
				<p>ChatShop ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<Link to={`/`}>Back to ChatShop</Link>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
	}
}

let InjectedAboutPageComponent = connect(mapStateToInjectedProps)(AboutPage)

export default InjectedAboutPageComponent;
