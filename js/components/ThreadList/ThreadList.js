import React, { Component } from 'react'
import { connect } from 'react-redux'

import { threadListSelector } from '../../logic/selectors'

import ThreadListItem from '../ThreadListItem'

class ThreadList extends Component {
	render() {
		const { dispatch, threadList } = this.props
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
					{threadList.map((thread, index) => 
						<ThreadListItem thread={thread} key={index} />
					)}
				</div>
			</div>
		)
	}
}

let InjectedThreadListComponent = connect(threadListSelector)(ThreadList)

export default InjectedThreadListComponent
