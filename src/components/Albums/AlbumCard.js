import React from 'react'
import { Card, Dimmer, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AlbumCard extends React.Component {
  constructor(){
    super()
    this.state = {
      active: false
    }
  }

  onLeave = () => this.setState({active: false})
  onEnter = () => this.setState({active: true})

  render(){
    let {album} = this.props
    return (
      <div className="ui special cards">
        <Card fluid onMouseLeave={this.onLeave} onMouseEnter={this.onEnter}>
          {
            this.props.user && this.props.user.admin ? (
              <Dimmer.Dimmable dimmed={this.state.active}>
                <Dimmer active={this.state.active}>
                  <div className="content">
                    <div className="center">
                      <Link to={`/albums/${album.slug}/edit`}>
                        <div className="ui inverted button">Edit Album</div>
                      </Link>
                      <div className="ui hidden divider"></div>
                      <Link to={`/albums/${album.slug}/edit/tracks`}>
                        <div className="ui inverted button">Edit Tracks</div>
                      </Link>
                    </div>
                  </div>
                </Dimmer>
                <Image className="album-art" src={album.image_url} alt={album.title} />
              </Dimmer.Dimmable>
            ) : (
              <Image className="album-art" src={album.image_url} alt={album.title} />
            )
          }
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default connect(mapStateToProps)(AlbumCard)
