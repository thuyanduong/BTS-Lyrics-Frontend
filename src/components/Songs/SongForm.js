import React from 'react'
import URL from '../../_helpers/url'
import NotFound from '../NotFound'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {submit} from '../../redux/actionCreators'
import slugify from '../../_helpers/slugifier'

class SongForm extends React.PureComponent{
  state = {
    id: null,
    title: "",
    album_type_id: "1",
    album_id: "1",
    track_number: "0",
    translator: "",
    translator_url: "",
    music_url: "",
    youtube_url: "",
    is_duplicate: false,
    duplicate_song_id: "0",
    lyrics: "",
    translation: "",

    mode: "Add",
    albumTypes: [],
    songLoading: true,
    albumTypesLoading: true,
    notFound: false
  }

  componentDidMount(){
    this.fetchSong()
    this.fetchAlbumTypes()
  }

  fetchSong = () => {
    if(this.props.match.params.id){
      fetch(`${URL}/songs-by-id/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(song => {
        if(song){
          this.setState({...song, songLoading: false, mode: "Edit"})
        }else{
          this.setState({notFound: true, songLoading: false})
        }
      })
    }else{
      this.setState({songLoading: false})
    }
  }

  fetchAlbumTypes = () => {
    fetch(`${URL}/bts`)
    .then(res => res.json())
    .then(albumTypes => {
      this.setState({albumTypes, albumTypesLoading: false})
    })
  }

  onChangeForm = (event) => {
    if(event.target.type === "checkbox"){
      this.setState({is_duplicate: event.target.checked, duplicate_song_id: "0"})
    }else{
      this.setState({[event.target.name]: event.target.value})
    }
  }

  validateFields = () => {
    if(this.state.title.trim().length <= 0){
      window.alert("Please enter a Song Title.")
      return false
    }
    else if(this.state.track_number === "0"){
      window.alert("Please enter a Track number.")
      return false
    }
    else if(this.state.is_duplicate && this.state.duplicate_song_id === "0"){
      window.alert("Please select the original song for this duplicate.")
      return false
    }else if(this.state.is_duplicate && (
      this.state.translator.length > 0 || this.state.translator_url.length > 0 ||
      this.state.music_url.length > 0 || this.state.youtube_url.length > 0 ||
      this.state.lyrics.length > 0 || this.state.translation.length > 0
    )){
      window.alert("Duplicate songs cannot have a translator, translator URL, music URL, Youtube URL, lyrics, or translations.")
      return false
    }
    return true
  }

  resetForm = () => {
    this.setState({
      id: null,
      title: "",
      track_number: "0",
      translator: "",
      translator_url: "",
      music_url: "",
      youtube_url: "",
      is_duplicate: false,
      duplicate_song_id: "0",
      lyrics: "",
      translation: ""
    })
  }

  confirmDelete = () => {
    return window.confirm("Are you sure you want to delete this song? Any duplicate songs will be deleted as well.")
  }

  redirect = () => {
    this.props.history.push(`/songs/${slugify(this.state.title)}`)
  }

  redirectAndRefresh = () => {
    this.props.history.push('/')
    window.location.reload()
  }

  onSubmit = (event, options) => {
    event.preventDefault()
    if(options.verify()){
      this.props.submit('song', {...this.state, slug: slugify(this.state.title)}, options)
    }
  }

  generateButtons(){
    return (this.state.mode === "Add" ?
      (<div>
        <input onClick={(e) => this.onSubmit(e, {
          method:"POST",
          verify:this.validateFields,
          callback:this.resetForm
        })} type="submit" value="Create Song"/>
      </div>)
      :
      (<div>
        <input onClick={(e) => this.onSubmit(e, {
          method: "PATCH",
          verify: this.validateFields,
          callback: this.redirect
        })} type="submit" value="Save"/>
        <input onClick={(e) => this.onSubmit(e, {
          method: "DELETE",
          verify: this.confirmDelete,
          callback: this.redirectAndRefresh
        })} type="submit" value="Delete"/>
      </div>)
    )
  }

  render(){
    let albumTypes = this.state.albumTypes
    return(
      this.state.albumTypesLoading || this.state.songLoading ? null : (
        this.state.notFound ? <NotFound/> : (
          <div>{this.state.mode === "Add" ? "Add New Song" : "Edit Song"}
            <form>
              <div>
                <select name="album_type_id" disabled={this.state.mode==="Edit"}
                value={this.state.album_type_id} onChange={this.onChangeForm}>
                  {albumTypes.map(option => (
                  <option key={option.id} value={option.id}
                   >{option.category}</option>
                  ))}
                </select>
                <select name="album_id" disabled={this.state.mode==="Edit"}
                value={this.state.album_id} onChange={this.onChangeForm}>
                  {albumTypes.length === 0 ? null :
                  albumTypes.find(a => a.id.toString() === this.state.album_type_id.toString()).albums.map(
                  option => (<option key={option.id} value={option.id}
                  >{option.title}</option>)
                  )}
                </select>
              </div>
              <div>Track Number:
              <input type="number" name="track_number"
                value={this.state.track_number} onChange={this.onChangeForm}/>
              </div>
              <input type="text" name="title" placeholder="Song Title"
                value={this.state.title} onChange={this.onChangeForm}/>
              <input type="text" name="translator" placeholder="Translator"
                value={this.state.translator} onChange={this.onChangeForm}/>
              <input type="text" name="translator_url" placeholder="Translation URL"
                value={this.state.translator_url} onChange={this.onChangeForm}/>
              <input type="text" name="music_url" placeholder="Music URL"
                value={this.state.music_url} onChange={this.onChangeForm}/>
              <input type="text" name="youtube_url" placeholder="YouTube URL"
                value={this.state.youtube_url} onChange={this.onChangeForm}/>
              <div>
                <label>Duplicate Song </label>
                <input type="checkbox" name="is_duplicate"
                  checked={this.state.is_duplicate} onChange={this.onChangeForm}/>
                {
                  !this.state.is_duplicate ? null :
                  <select name="duplicate_song_id" onChange={this.onChangeForm}>
                    <option id="0" value="0"></option>
                    {
                      this.state.albumTypes.map(cat => cat.albums).flat().map(a => a.songs).flat().filter(s => !s.is_duplicate).sort((a,b)=>a.title.localeCompare(b.title)).map(song => (
                        <option key={song.id} value={song.id}>{song.title}</option>
                      ))
                    }
                  </select>
                }
              </div>
              <div>
                <textarea name="lyrics" placeholder="LYRICS"
                  value={this.state.lyrics} onChange={this.onChangeForm}/>
                <textarea name="translation" placeholder="TRANSLATION"
                  value={this.state.translation} onChange={this.onChangeForm}/>
              </div>
              {this.generateButtons()}
            </form>
          </div>
        )
      )
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submit: (resource, info, options)=>{dispatch(submit(resource, info, options))},
})

export default withRouter(connect(null, mapDispatchToProps)(SongForm))
