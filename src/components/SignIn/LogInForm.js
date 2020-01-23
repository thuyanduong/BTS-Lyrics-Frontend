import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {logIn} from '../../redux/actionCreators'
import {connect} from 'react-redux'

class LogInForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.logIn(this.state.username, this.state.password)
  }

  onChangeForm = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return !this.props.user ? (
      <React.Fragment>
        <div className="ui container segment" style={{backgroundColor: "#f8f8f9"}}>
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username"
              onChange={this.onChangeForm}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password"
              onChange={this.onChangeForm}/>
            </div>
            <input type="submit" className="ui submit button" value="Log In"/>
          </form>
        </div>
        <p>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </React.Fragment>
    ) : <Redirect to={`/`} />
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default connect(mapStateToProps, {logIn})(LogInForm)
