import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AlbumsList extends React.Component {
  makeSongDiv = (song) => {
    return (
      <div style={{textAlign:"left"}} className="" key={song.id}>
        {`${song.track_number}. `}
        <Link to={`/songs/${song.slug}`}>{song.title}</Link>
      </div>
    )
  }

  makeAlbumDiv = (album) => {
    return(
      <div className="ui items message album-container" id={album.slug} key={album.id}>
        <h5>{album.title}</h5>
        <div className="item">
          <div style={{width:"50%"}} className="container">
            <div style={{float:"right"}} >
              <img className="album-image" src={album.image_url} alt={album.title} />
              <p>Release Date: {album.release_date}</p>
              <div>
                {album.music_url.includes('spotify.com') ? <a target="_blank" rel="noopener noreferrer" href={album.music_url}>
                  <img style={{width:'20px', height:'20px'}} src="https://image.flaticon.com/icons/svg/8/8710.svg" alt="Spotify"/>
                </a> : null}
                {album.music_url.includes('soundcloud.com') ? <a target="_blank" rel="noopener noreferrer" href={album.music_url}>
                  <img style={{width:'20px', height:'20px'}} src="https://image.flaticon.com/icons/svg/49/49336.svg" alt="SoundCloud"/>
                </a> : null}
              </div>
            </div>
          </div>
          <div style={{width:"50%", paddingLeft:"10px"}} className="container">
            {album.songs.map(song => this.makeSongDiv(song))}
          </div>
        </div>
      </div>
    )
  }

  makeAlbumTypeDiv = (albumType) => {
    return(
      <div className="" key={albumType.id}>
        <h3>{albumType.category}</h3>
        {albumType.albums.map(album => this.makeAlbumDiv(album))}
        <div className="ui divider"></div>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.props.albumTypes.map(albumType => this.makeAlbumTypeDiv(albumType))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  albumTypes: state.albums
})

export default connect(mapStateToProps)(AlbumsList)
