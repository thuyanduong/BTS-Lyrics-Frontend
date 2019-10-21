import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return (
      <div className="ui inverted menu">
        <Link to="/">
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

        <div className="right menu">
          <Link to="/albums/new">
            <div className="item right">
              Add Album
            </div>
          </Link>
          <Link to="/songs/new">
            <div className="item right">
              Add Song
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
