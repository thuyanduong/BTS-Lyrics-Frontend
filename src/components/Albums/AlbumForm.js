import React from 'react'
import {connect} from 'react-redux'
import {submit} from '../../redux/actionCreators'
import {withRouter} from 'react-router-dom'
import URL from '../../_helpers/url'
import moment from 'moment'
import NotFound from '../NotFound'
import slugify from '../../_helpers/slugifier'

class AlbumForm extends React.PureComponent{
  state = {
    id: null,
    album_type_id: "1",
    title: "",
    release_date: "",
    image_url: "",
    music_url: "",

    mode: "Add",
    albumTypes: [],
    albumLoading: true,
    albumTypesLoading: true,
    notFound: false
  }

  componentDidMount(){
    this.fetchAlbum()
    this.fetchAlbumTypes()
  }

  fetchAlbum = () => {
    if(this.props.match.params.slug){
      fetch(`${URL}/albums/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(album => {
        if(album){
          this.setState({...album, albumLoading: false, mode: "Edit"})
        }else{
          this.setState({notFound: true, albumLoading: false})
        }
      })
    }else{
      this.setState({albumLoading: false})
    }
  }

  fetchAlbumTypes = () => {
    fetch(`${URL}/album-types`)
    .then(res => res.json())
    .then(albumTypes => {
      this.setState({albumTypes, albumTypesLoading: false})
    })
  }

  validateFields = () => {
    if(this.state.title.trim().length <= 0){ //check title
      window.alert("Please enter an Album Title.")
      return false
    }else if(!moment(this.state.release_date, 'YYYY-MM-DD',true).isValid()){ //check release_date
      window.alert("Please enter a valid Release Date.")
      return false
    }
    return true
  }

  onChangeForm = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = (event, options) => {
    event.preventDefault()
    if(options.verify()){
      this.props.submit('album', {...this.state, slug: slugify(this.state.title)}, options)
    }
  }

  resetForm = () => {
    this.setState({
      id: null,
      title: "",
      release_date: "",
      image_url: "",
      music_url: ""
    })
  }

  confirmDelete = () => {
    return window.confirm("Are you sure you want to delete this album?")
  }

  redirect = () => {
    this.props.history.push('/')
  }

  generateButtons(){
    return (this.state.mode === "Add" ?
      (<div>
        <input onClick={(e) => this.onSubmit(e, {
          method:"POST",
          verify:this.validateFields,
          callback:this.resetForm
        })} type="submit" value="Create Album"/>
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
          callback: this.redirect
        })} type="submit" value="Delete"/>
      </div>)
    )
  }

  render(){
    return(
      this.state.albumTypesLoading || this.state.albumLoading ? null : (
        this.state.notFound ? <NotFound/> : (
          <div>{this.state.mode === "Add" ? "Add New Album" : "Edit Album"}
              <form>
                <select name="album_type_id" disabled={this.state.mode==="Edit"}
                value={this.state.album_type_id} onChange={this.onChangeForm}>
                  {this.state.albumTypes.map(option => (
                    <option key={option.id} value={option.id}
                     >{option.category}</option>
                  ))}
                </select>
                <input type="text" name="title" placeholder="Album Title"
                  value={this.state.title}  onChange={this.onChangeForm}/>
                <input type="date" name="release_date" placeholder="Release Date"
                  value={this.state.release_date}  onChange={this.onChangeForm}/>
                <input type="text" name="image_url" placeholder="Image URL"
                  value={this.state.image_url}  onChange={this.onChangeForm}/>
                <input type="text" name="music_url" placeholder="Music URL"
                  value={this.state.music_url} onChange={this.onChangeForm} />
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

export default withRouter(connect(null, mapDispatchToProps)(AlbumForm))
