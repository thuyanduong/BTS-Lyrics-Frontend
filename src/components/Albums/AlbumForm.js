import React from 'react'
import {connect} from 'react-redux'
import {submit, addMessage} from '../../redux/actionCreators'
import {withRouter} from 'react-router-dom'
import URL from '../../_helpers/url'
import moment from 'moment'
import NotFound from '../NotFound'
import slugify from '../../_helpers/slugifier'
import {ScaleLoader} from 'react-spinners'
import {Modal, Grid} from 'semantic-ui-react'

class AlbumForm extends React.Component{
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
    notFound: false,

    showConfirmation: false
  }

  componentDidMount(){
    this.fetchAlbum()
    this.fetchAlbumTypes()
  }

  fetchAlbum = () => {
    if(this.props.match.params.slug){
      fetch(`${URL}/album-by-title/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(album => {
        if(album){
          this.setState({...album, albumLoading: false, mode: "Edit"})
        }else{
          this.setState({notFound: true, albumLoading: false})
        }
      })
      .catch(err => this.props.addMessage(err.toString(), "error"))
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
    .catch(err => this.props.addMessage(err.toString(), "error"))
  }

  validateFields = () => {
    if(this.state.title.trim().length <= 0){ //check title
      this.props.addMessage("Please enter an Album Title.", "error")
      return false
    }else if(!moment(this.state.release_date, 'YYYY-MM-DD',true).isValid()){ //check release_date
      this.props.addMessage("Please enter a valid Release Date.", "error")
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
      album_type_id: 1,
      title: "",
      release_date: "",
      image_url: "",
      music_url: ""
    })
  }

  toggleModal = () => {
    this.setState({showConfirmation: !this.state.showConfirmation})
  }

  redirect = () => {
    this.props.history.push('/albums')
  }

  renderButtons(){
    return (this.state.mode === "Add" ?
      (<div>
        <input className="ui button" onClick={(e) => this.onSubmit(e, {
          method:"POST",
          verify:this.validateFields,
          callback:this.resetForm
        })} type="submit" value="Add Album"/>
      </div>)
      :
      (<div>
        <input className="ui button" onClick={(e) => this.onSubmit(e, {
          method: "PATCH",
          verify: this.validateFields,
          callback: this.redirect
        })} type="submit" value="Save"/>
        <input className="ui button basic" onClick={this.toggleModal} type="button" value="Delete"/>
      </div>)
    )
  }

  renderModal = () => (
    <Modal open={this.state.showConfirmation} onClose={this.toggleModal}>
      <Modal.Content>
      <Grid>
        <Grid.Column textAlign="center">
          <h2>Are you sure you want to delete this album?
            <br/>
            <br/>
            <button className="ui button"
            onClick={this.toggleModal}>Cancel</button>
            <button className="ui primary button"
            onClick={(e) => this.onSubmit(e, {
              method: "DELETE",
              verify: ()=>true,
              callback: this.redirect
            })}>Yes, Delete!</button>
          </h2>
        </Grid.Column>
      </Grid>
      </Modal.Content>
    </Modal>
  )

  render(){
    return this.props.user && this.props.user.admin ? (
      this.state.albumTypesLoading || this.state.albumLoading ? <ScaleLoader/> : (
        this.state.notFound ? <NotFound/> : (
          <div className="ui container segment" style={{backgroundColor: "#f8f8f9"}}>
            {this.renderModal()}
              <h3>{this.state.mode === "Add" ? "Add New Album" : "Edit Album"}</h3>
              <div className="ui divider hidden"></div>
              <form className="ui form">
                <div className="field">
                  <select className="ui selection dropdown" name="album_type_id" value={this.state.album_type_id}
                    onChange={this.onChangeForm}>
                    {this.state.albumTypes.map(option => (
                      <option key={option.id} value={option.id}
                       >{option.category}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <input type="text" name="title" placeholder="Album Title"
                    value={this.state.title}  onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <input type="date" name="release_date" placeholder="Release Date"
                    value={this.state.release_date}  onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <input type="text" name="image_url" placeholder="Image URL"
                    value={this.state.image_url}  onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <input type="text" name="music_url" placeholder="Music URL"
                    value={this.state.music_url} onChange={this.onChangeForm} />
                </div>
                {this.renderButtons()}
              </form>
          </div>
        )
      )
    ) : <NotFound />
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps, {submit, addMessage})(AlbumForm))
