import React from 'react'
import {Link} from 'react-router-dom'

class SignUpForm extends React.Component {
  render(){
    return (
      <div className="ui container segment" style={{backgroundColor: "#f8f8f9"}}>
        <p>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
      </div>
    )
  }
}

export default SignUpForm
