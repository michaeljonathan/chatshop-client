var outputFileSync = require('output-file-sync');

export default function generateComponent(componentName) {

	var componentJS =
/***** Begin component JS *****/ `\
import React, { Component } from 'react'
import { connect } from 'react-redux'

class ${componentName} extends Component {
	render() {
		const { dispatch } = this.props;
		return (
			<div>
			</div>
		)
	}
}

function mapStateToInjectedProps(state) {
	return {
	}
}

let Injected${componentName}Component = connect(mapStateToInjectedProps)(${componentName})

export default Injected${componentName}Component
`; /***** End component JS *****/

	var packageJSON =
/***** Begin package.json *****/ `\
{
	"name": "${componentName}",
	"main": "./${componentName}.js"
}
`; /***** End package.json *****/

	outputFileSync(`js/components/${componentName}/${componentName}.js`, componentJS);
	outputFileSync(`js/components/${componentName}/package.json`, packageJSON);
}
