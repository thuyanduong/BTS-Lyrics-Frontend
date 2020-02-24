import React from 'react'
import URL from '../../_helpers/url'
import NotFound from '../NotFound'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {submit, fetchingData} from '../../redux/actionCreators'
import slugify from '../../_helpers/slugifier'
import {ScaleLoader} from 'react-spinners'
import {Modal, Grid} from 'semantic-ui-react'

class SongForm extends React.PureComponent{
  state = {
    id: null,
    title: "",
    translator: "",
    translator_url: "",
    music_url: "",
    youtube_url: "",
    lyrics: "",
    translation: "",

    mode: "Add",
    loading: true,
    notFound: false,

    showConfirmation: false
  }

  componentDidMount(){
    this.fetchSong()
  }

  fetchSong = () => {
    if(this.props.match.params.slug){
      fetch(`${URL}/song-by-title/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(song => {
        if(song){
          this.setState({...song, loading: false, mode: "Edit"})
        }else{
          this.setState({notFound: true, loading: false})
        }
      })
      .catch(err => this.props.addMessage(err.toString(), "error"))
    }else{
      this.setState({loading: false})
    }
  }

  onChangeForm = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  validateFields = () => {
    if(this.state.title.trim().length <= 0){
      this.props.addMessage("Please enter a Song Title.", "error")
      return false
    }
    return true
  }

  resetForm = () => {
    this.setState({
      id: null,
      title: "",
      translator: "",
      translator_url: "",
      music_url: "",
      youtube_url: "",
      lyrics: "",
      translation: ""
    })
  }

  redirect = () => {
    this.props.fetchingData()
    this.props.history.push(`/songs/${slugify(this.state.title)}`)
  }

  goBack = () => {
    this.props.fetchingData()
    this.props.history.push('/songs')
  }

  onSubmit = (event, options) => {
    event.preventDefault()
    if(options.verify()){
      this.props.submit('song', {...this.state, slug: slugify(this.state.title)}, options)
      if(document.querySelector("#delete")){
        document.querySelector("#delete").disabled = true
      }
    }
  }

  toggleModal = () => {
    this.setState({showConfirmation: !this.state.showConfirmation})
  }

  renderButtons(){
    return (this.state.mode === "Add" ?
      (<div>
        <input className="ui button" onClick={(e) => this.onSubmit(e, {
          method:"POST",
          verify:this.validateFields,
          callback:this.resetForm
        })} type="submit" value="Add Song"/>
      </div>)
      :
      (<div>
        <input className="ui button" onClick={(e) => this.onSubmit(e, {
          method: "PATCH",
          verify: this.validateFields,
          callback: this.redirect
        })} type="submit" value="Save"/>
        <input className="ui button basic" id="delete" onClick={this.toggleModal} type="button" value="Delete"/>
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
      this.state.loading ? <ScaleLoader /> : (
        this.state.notFound ? <NotFound/> : (
          <div className="ui container segment" style={{backgroundColor: "#f8f8f9"}}>
            {this.renderModal()}
            <h3>{this.state.mode === "Add" ? "Add New Song" : "Edit Song"}</h3>
            <div className="ui divider hidden"></div>
            <form className="ui form">
              <div className="field">
                <input type="text" name="title" placeholder="Song Title"
                  value={this.state.title} onChange={this.onChangeForm}/>
              </div>
              <div className="two fields">
                <div className="field">
                  <input type="text" name="translator" placeholder="Translator"
                    value={this.state.translator} onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <input type="text" name="translator_url" placeholder="Translation URL"
                    value={this.state.translator_url} onChange={this.onChangeForm}/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <input type="text" name="music_url" placeholder="Music URL"
                    value={this.state.music_url} onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <input type="text" name="youtube_url" placeholder="YouTube URL"
                    value={this.state.youtube_url} onChange={this.onChangeForm}/>
                </div>
              </div>

              <div className="ui divider"></div>

              <div className="two fields">
                <div className="field">
                  <textarea name="lyrics" placeholder="LYRICS" rows="20"
                    value={this.state.lyrics} onChange={this.onChangeForm}/>
                </div>
                <div className="field">
                  <textarea name="translation" placeholder="TRANSLATION" rows="20"
                    value={this.state.translation} onChange={this.onChangeForm}/>
                </div>

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

export default withRouter(connect(mapStateToProps, {submit, fetchingData})(SongForm))
