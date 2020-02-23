import React from 'react'
import {connect} from 'react-redux'
import Message from './Message'

class MessageList extends React.Component {
  render(){
    return (
      <div>
        <div className="message-list">
          {this.props.messageQueue.map(message => <Message key={message.id} message={message}/>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messageQueue: state.messageQueue
})

export default connect(mapStateToProps)(MessageList)
