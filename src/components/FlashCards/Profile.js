import React from 'react'
import {connect} from 'react-redux'

const Profile = (props) => {
    return (
      <div className="ui segment bold profile">
        {props.user.username}
      </div>
    )
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default connect(mapStateToProps)(Profile)
