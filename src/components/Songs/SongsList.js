import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {BeatLoader} from 'react-spinners'
//styling

const SongDiv = ({song, index}) => (
  <div> {`${index+1}. `}
    <Link to={`/songs/${song.slug}`}>
      {song.title}
    </Link>
  </div>
)

const SongsList = (props) => props.loading ? <BeatLoader /> : (
  <div>
    {props.songs.map((song, index) => <SongDiv key={song.id} song={song} index={index}/>)}
  </div>
)

const mapStateToProps = state => ({
  songs: state.songs,
  loading: state.loadingSongs
})

export default withRouter(connect(mapStateToProps)(SongsList))
