import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestLogin } from '../../logic/actions'
import { loginPageSelector } from '../../logic/selectors'

class LoginPage extends Component {

	constructor() {
		super()
		this.state = {}
		this.onUsernameChange = this.onUsernameChange.bind(this)
		this.onPasswordChange = this.onPasswordChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	componentDidMount() {
		this.setState({
			username: 'mj',
			password: '3005'
		})
	}

	onUsernameChange(e) {
		this.setState(Object.assign({}, this.state, {username: e.target.value}))
	}
	onPasswordChange(e) {
		this.setState(Object.assign({}, this.state, {password: e.target.value}))
	}
	onSubmit(e) {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch(requestLogin({
			username: this.state.username,
			password: this.state.password
		}))
	}

	render() {
		const { error } = this.props
		return (
			<div className="LoginPage">
				<form className="LoginPage__cc" onSubmit={this.onSubmit}>
					<h1>Hi, there.</h1>
					<input type="text" placeholder="username" ref="username" value={this.state.username} onChange={this.onUsernameChange}/>
					<input type="password" placeholder="password" ref="password" value={this.state.password} onChange={this.onPasswordChange}/>
					<input type="submit" className="btn--submit" value="Login"/>
					{ error &&
						<span className="LoginPage__error">{ error }</span>
					}
				</form>
			</div>
		)
	}

}

let InjectedLoginPageComponent = connect(loginPageSelector)(LoginPage)

export default InjectedLoginPageComponent
