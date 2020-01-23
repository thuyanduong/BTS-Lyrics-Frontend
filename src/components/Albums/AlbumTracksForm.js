import React from 'react'
import URL from '../../_helpers/url'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ScaleLoader} from 'react-spinners'
import { Dropdown } from 'semantic-ui-react'
import NotFound from '../NotFound'
import {submit} from '../../redux/actionCreators'

const newSong = {id: null, title:"" , slug:""}

class AlbumTracksForm extends React.Component {
  state = {
    id: null,
    title: "",
    slug: "",
    release_date: "",
    image_url: "",
    tracks: [],

    albumLoading: true,
    notFound: false
  }

  componentDidMount(){
    this.fetchAlbum()
    this.fetchSongs()
  }

  fetchSongs(){
    fetch(`${URL}/songs`)
    .then(res => res.json())
    .then(songs => {
      this.setState({songs: songs, songsLoading: false})
    })
  }

  fetchAlbum(){
    if(this.props.match.params.slug){
      fetch(`${URL}/album-by-title/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(album => {
        if(album){
          this.setState({...album, albumLoading: false})
        }else{
          this.setState({notFound: true, albumLoading: false})
        }
      })
    }else{
      this.setState({albumLoading: false})
    }
  }

  onAddTrackInput = () => {
    let tracksCopy = [...this.state.tracks]
    let nextIndex
    if(tracksCopy.length > 0){
      nextIndex = tracksCopy[tracksCopy.length-1].track_number + 1
    }else{
      nextIndex = 1
    }
    nextIndex = nextIndex || 1
    tracksCopy.push({ track_number: nextIndex, song: {...newSong} })
    this.setState({tracks: tracksCopy})
  }

  onRemoveTrackInput = (index) => {
    let newTracks = this.state.tracks.filter((track, i) => i!== index)
    this.setState({ tracks: newTracks})
  }

  onChangeTrackNumber = (event, index) => {
    event.persist()
    let numInput = parseInt(event.target.value)
    let newTracks = [...this.state.tracks]
    if(Number.isNaN(numInput) || numInput <= 0 || numInput > 1000){
      newTracks[index] = {...newTracks[index], track_number: ""}
      event.target.value = ''
    }else{
      newTracks[index] = {...newTracks[index], track_number: parseInt(numInput)}
    }
    this.setState({tracks: newTracks})
  }

  onChangeTrackSong = (event, data, index) => {
    let song = this.props.songs.find(s => s.title === data.value)
    let newTracks = [...this.state.tracks]
    newTracks[index] = {...newTracks[index], song}
    this.setState({tracks: newTracks})
  }

  validateSongs = () => {
    for(let track of this.state.tracks){
      if(track.song.id === null || track.track_number === ""){
        alert("Please enter valid track numbers and songs.")
        return false
      }
    }
    return true
  }

  onSubmit = (event, options) => {
    if(options.verify()){
      this.props.submit('tracks', {...this.state}, options)
      event.target.disabled = true
    }
  }

  redirect = () => {
    this.props.history.push('/albums')
  }

  albumDiv(){
    return (
      <div className="ui items message album-container">
        <h2>{this.state.title}</h2>
        <img className="album-art" src={this.state.image_url} alt={this.state.title} />
        <p>Release Date: {this.state.release_date}</p>
        <form className="ui form" id="tracks-form">
          {this.state.tracks.map((track, index) => <this.TrackForm
            key={`${index}${track.track_number}${track.song.title}`}
            track={track}
            index={index}
          />)}
        </form>
        <button className="ui button basic" onClick={this.onAddTrackInput}>Add Track</button>
      </div>
    )
  }

  TrackForm = ({track, index}) => {
    return (
      <div className="fields">
        <div className="two wide field">
          <input className="number" type="number" defaultValue={track.track_number}
          onBlur={(e) => this.onChangeTrackNumber(e, index)}/>
        </div>
        <div className="fourteen wide field">
          <Dropdown
            defaultValue={track.song.title}
            fluid
            search
            selection
            onChange={(e, data) => this.onChangeTrackSong(e, data, index)}
            options={[{key: 0, value: 0, text:""},
              ...this.props.songs.map(song => ({key: song.id, value: song.title, text: song.title}) )
            ]}
          />
        </div>
        <div style={{"margin":"auto"}} >
          <i className="close link icon centered" onClick={()=>this.onRemoveTrackInput(index)}></i>
        </div>
      </div>
    )
  }

  render(){
    return this.props.user && this.props.user.admin ? (
      this.state.albumLoading || this.props.songsLoading ? <ScaleLoader/> : (
        this.state.notFound ? <NotFound/> : (
          <div>
            {this.albumDiv()}
            <button className="ui button" onClick={(e) => this.onSubmit(e, {
              method: "PUT",
              verify: this.validateSongs,
              callback: this.redirect
            })}>Save</button>
          </div>
        )
      )
    ) : <NotFound />
  }
}

const mapStateToProps = (state) => ({
  songs: state.songs,
  songsLoading: state.loadingSongs,
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps, {submit})(AlbumTracksForm))
