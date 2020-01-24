import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../redux/actionCreators'
import { Dropdown } from 'semantic-ui-react'

class Navbar extends React.Component {
  onLogOut = () => {
    localStorage.removeItem("token")
    this.props.logOut()
    this.props.history.push('/')
  }

  onSelectDropDownOption = (url) => {
    this.props.history.push(url)
  }

  renderAdminOptions = () => this.props.user && this.props.user.admin ? (
      <Fragment>
        <Dropdown.Item onClick={()=>this.onSelectDropDownOption(`/albums/new`)}>
          Add Album
          </Dropdown.Item>
        <Dropdown.Item onClick={()=>this.onSelectDropDownOption(`/songs/new`)}>
          Add Song
        </Dropdown.Item>
      </Fragment>
    ) : null

  renderLogInOrOut = () => {
    return this.props.user ? (
      <Fragment>
        <Link to={`/`}>
          <div className="item right">
            My Flashcards
          </div>
        </Link>
        <Dropdown className='link item' text={this.props.user.username} pointing>
          <Dropdown.Menu>
            {this.renderAdminOptions()}
            <Dropdown.Item onClick={this.onLogOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    ) : (
      <Link to="/login">
        <div className="item right">
          Log In
        </div>
      </Link>
    )
  }



  render(){
    return (
      <div className="ui inverted menu">
        <Link to="/search">
          <div className="item">
            Search
          </div>
        </Link>
        <Link to="/albums">
          <div className="item">
            Albums
          </div>
        </Link>
        <Link to="/songs">
          <div className="item">
            Songs
          </div>
        </Link>
        {
          this.props.loading ? null :
          <div className="right menu">
            {this.renderLogInOrOut()}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    loading: state.loadingCurrentUser,
  }
}

export default withRouter(connect(mapStateToProps, {logOut})(Navbar))
