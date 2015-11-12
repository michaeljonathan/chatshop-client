import React from 'react'
import { render } from 'react-dom'

import App from './components/app'

let rootElement = document.querySelector('.content')

render(
	<App />,
	rootElement
)
