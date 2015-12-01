import React, { Component } from 'react'

export default class ThreadListItem extends Component {
	render() {
		const thread = this.props.thread;
		return (
			<div className="ThreadListItem">
				<div className="ThreadListItem__topRow">
					<span className="ThreadListItem__currentIndicator"></span>
					<span className="ThreadListItem__unreadCount"></span>
					<div className="ThreadListItem__name">{thread.title}</div>
				</div>
				<div className="ThreadListItem__secondRow">
					{(() => {if (thread.latestMessage) {
						return <div className="ThreadListItem__snippet">{thread.latestMessage.author.name}: {thread.latestMessage.message}</div>
					}})()}
				</div>
			</div>
		)
	}
}

ThreadListItem.propTypes = {
	thread: React.PropTypes.object
}
