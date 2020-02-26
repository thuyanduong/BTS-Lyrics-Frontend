import React from 'react'
import {connect} from 'react-redux'
import {removeMessage} from '../../redux/actionCreators'

const Message = props => {
  let {content, id, type} = props.message
  return (
    <div className={`ui floating message fade ${type}`}>
      <i className="close icon" onClick={()=>{props.removeMessage(id)}}></i>
      {content}
    </div>
  )
}


export default connect(null, {removeMessage})(Message)
