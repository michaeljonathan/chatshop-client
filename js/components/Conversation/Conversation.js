import React, { Component } from 'react'
import { connect } from 'react-redux'

import { conversationSelector } from '../../logic/selectors'

class Conversation extends Component {
	render() {
		const { thread } = this.props

		var threadTitle;
		switch (thread.type) {
			case 'group':
				threadTitle = thread.title
				break
			case 'personal':
				threadTitle = thread.other.name
				break
			default:
				break
		}

		return (
			<div className="Conversation">
				<div className="Conversation__header">
					<div className="Conversation__header__top">
						<span className="Conversation__threadTitle">{threadTitle}</span>
						<span className="Conversation__options">&gt;</span>
					</div>
					<div className="Conversation__header__bottom">
						<span className="Conversation__threadDescription">{thread.description}</span>
					</div>
				</div>
				<div className="Conversation__chat">
					{(() => {
						if (thread.messages) {
							return thread.messages.map((message, index) =>
								<div className="Conversation__message" key={index}>
									<div className="Conversation__message__author">{message.author.name}</div>
									<div className="Conversation__message__date">{message.date.slice(0, 10)}</div>
									<div className="Conversation__message__message">{message.message}</div>
								</div>
							)
						}
					})()}
				</div>
				<div className="Conversation__composer">
					<div className="Conversation__composerInputContainer">
						<input type="text" placeholder="Write something..."/>
					</div>
					<div className="Conversation__composerControls">
						<div className="Conversation__buttonSend">Send</div>
					</div>
				</div>
			</div>
		)
	}
}

let InjectedConversationComponent = connect(conversationSelector)(Conversation)

export default InjectedConversationComponent