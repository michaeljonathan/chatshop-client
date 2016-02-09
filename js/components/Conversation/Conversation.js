import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { composerUpdateDraft, requestSendMessage } from '../../logic/actions'
import { conversationSelector } from '../../logic/selectors'

class Conversation extends Component {

	constructor() {
		super()
		this.onChangeComposer = this.onChangeComposer.bind(this)
		this.onClickSend = this.onClickSend.bind(this)
		this.onKeyPressComposer = this.onKeyPressComposer.bind(this)
	}

	onChangeComposer(e) {
		const { dispatch, thread } = this.props
		dispatch(composerUpdateDraft(thread, e.target.value))
	}

	onClickSend() {
		const { dispatch, currentUser, thread } = this.props

		let messageText = this.refs.textComposer.value
		if (!messageText) {
			return
		}

		dispatch(requestSendMessage(thread, currentUser, messageText))
		dispatch(composerUpdateDraft(thread, ''))
	}

	onKeyPressComposer(e) {
		if ((e.keyCode || e.which) == 13) { // Enter
			this.onClickSend()
		}
	}

	render() {
		const { currentUser, thread } = this.props

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
									<div className="Conversation__message__date">
										{message.author == currentUser ? (message.isSending ? '◷ ' : '✓ ') : ''}
										{message.date.slice(0, 10)}
									</div>
									<div className="Conversation__message__message">{message.message}</div>
								</div>
							)
						}
					})()}
				</div>
				<div className="Conversation__composer">
					<div className="Conversation__composerInputContainer">
						<input type="text" placeholder="Write something..." ref="textComposer" value={thread.messageDraft} onChange={this.onChangeComposer} onKeyPress={this.onKeyPressComposer}/>
					</div>
					<div className="Conversation__composerControls">
						<div className={classNames("Conversation__buttonSend", {"Conversation__buttonSend-enabled": thread.messageDraft})} onClick={this.onClickSend}>Send</div>
					</div>
				</div>
			</div>
		)
	}
}

let InjectedConversationComponent = connect(conversationSelector)(Conversation)

export default InjectedConversationComponent