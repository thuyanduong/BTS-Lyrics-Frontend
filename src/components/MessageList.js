import React from 'react'
import {connect} from 'react-redux'

const Message = props => {
  return (
    <div class="ui floating message">
      <i class="close icon"></i>
      <p>
        Way to go!
      </p>
    </div>
  )
}

class MessageList extends React.Component {
  render(){
    return (
      <div style={{position: "absolute", zIndex: 1001}}>
        {this.props.messageQueue.map(message => <Message/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messageQueue: state.messageQueue
})

export default connect(mapStateToProps)(MessageList)
