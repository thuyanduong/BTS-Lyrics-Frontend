import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ScaleLoader} from 'react-spinners'

const SongDiv = ({song, index}) => (
  <div> {`${index+1}. `}
    <Link to={`/songs/${song.slug}`}>
      {song.title}
    </Link>
  </div>
)

const SongsList = (props) => props.loading ? <ScaleLoader /> : (
  <React.Fragment>
    <h2>Songs</h2>
    <div className="ui segment container" style={{backgroundColor: "#f8f8f9"}}>
      {props.songs.map((song, index) => <SongDiv key={song.id} song={song} index={index}/>)}
    </div>
  </React.Fragment>
)

const mapStateToProps = state => ({
  songs: state.songs,
  loading: state.loadingSongs
})

export default withRouter(connect(mapStateToProps)(SongsList))
