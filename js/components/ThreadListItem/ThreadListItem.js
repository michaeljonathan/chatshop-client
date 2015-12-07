import React, { Component } from 'react'

export default class ThreadListItem extends Component {
	render() {
		const thread = this.props.thread;

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
			<div className="ThreadListItem" onClick={(e)=>{this.props.onClick(e)}}>
				<div className="ThreadListItem__topRow">
					{(() => {if (thread.isCurrent)
						return <span className="ThreadListItem__currentIndicator"></span>
					})()}
					<span className="ThreadListItem__unreadCount"></span>
					<div className="ThreadListItem__name">{threadTitle}</div>
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
