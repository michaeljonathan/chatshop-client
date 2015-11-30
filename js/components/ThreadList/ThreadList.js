import React, { Component } from 'react'

import ThreadListItem from '../ThreadListItem'

export default class ThreadList extends Component {
	render() {
		return (
			<div className="ThreadList">
				<div className="ThreadList__header">
					<div className="ThreadList__header__left"></div>
					<div className="ThreadList__header__right"></div>
					<div className="ThreadList__header__center">Chats</div>
				</div>
				<div className="ThreadList__search">
					<input type="text" placeholder="Search..."/>
				</div>
				<div className="ThreadList__list">
					{this.props.threadList.map(function(thread, index) {
						return <ThreadListItem thread={thread} key={index} />
					})}
				</div>
			</div>
		)
	}
}
