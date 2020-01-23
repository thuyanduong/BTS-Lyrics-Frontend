import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {ScaleLoader} from 'react-spinners'
import AlbumCard from './AlbumCard'

const SongDiv = ({track}) => (
  <div style={{textAlign:"left"}}>
    {`${track.track_number}. `}
    <Link to={`/songs/${track.song.slug}`}>{track.song.title}</Link>
  </div>
)

const AlbumDiv = ({album}) => (
  <div className="ui items message" id={album.slug}>
    <h4>{album.title}</h4>
    <div className="item">
      <div style={{width:"50%"}}>
        <div style={{float:"right"}} >
          <AlbumCard album={album}/>
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
        {album.tracks.map(track => <SongDiv key={track.track_number} track={track}/>)}
      </div>
    </div>
  </div>
)

const AlbumTypeDiv = ({albumType}) => (
  <div className="ui container segment">
    <h2>{albumType.category}</h2>
      {albumType.albums.map(album => <AlbumDiv key={album.id} album={album}/>)}
  </div>
)

const AlbumsList = (props) => (
  props.loading ? <ScaleLoader/> : (
    <div>
      {props.albumTypes.map(albumType => <AlbumTypeDiv key={albumType.id} albumType={albumType} />)}
    </div>
  )
)

const mapStateToProps = state => ({
  albumTypes: state.albumTypes,
  loading: state.loadingData
})

export default withRouter(connect(mapStateToProps)(AlbumsList))
