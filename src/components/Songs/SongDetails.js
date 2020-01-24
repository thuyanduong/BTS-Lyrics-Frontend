import React from 'react'
import {withRouter} from 'react-router-dom'
import NotFound from '../NotFound'
import URL from '../../_helpers/url'
import {ScaleLoader} from 'react-spinners'
import {HashLink as Link} from 'react-router-hash-link';
import {connect} from 'react-redux'
import LyricsFormatOptions from './LyricsFormatOptions'
import queryString from 'query-string'
import Line from './Line'

class SongDetails extends React.PureComponent{
  constructor(){
    super()
    this.state = {
      loading: true,
      notFound: false,
      queryType: 'none',
      searchTerm: '',
      radioButton: 'default'
    }
  }

  componentDidMount(){
    this.fetchSong()
    let query = queryString.parse(this.props.location.search)
    if(query.line){
      this.setState({queryType: 'line', searchTerm: decodeURIComponent(query.line)})
    }else if(query.lyrics){
      this.setState({queryType: 'lyrics', searchTerm: decodeURIComponent(query.lyrics)})
    }else if(query.translation){
      this.setState({queryType: 'translation', searchTerm: decodeURIComponent(query.translation)})
    }
  }

  fetchSong = () => {
    fetch(`${URL}/song-by-title/${this.props.match.params.slug}`)
    .then(res => res.json())
    .then(song => {
      if(song){
        this.setState({...song, loading: false})
      }else{
        this.setState({notFound: true, loading: false})
      }
    })
  }

  renderLyricsBox = () => {
    let lyricsArray = this.state.lyrics.split('\n')
    let transArray = this.state.translation.split('\n')
    let mainArray = transArray.length > lyricsArray.length ? transArray :lyricsArray
    return(
      mainArray[0].length ? mainArray.map((x, index) => {
        return (
          <div className="ui grid" key={index}>
            {this.renderRow(index, lyricsArray, transArray)}
          </div>
        )
      }) : null
    )
  }

  renderRow = (index, lyricsArray, transArray) => {
    return <Line
      index={index}
      lyricsArray={lyricsArray}
      transArray={transArray}
      queryType={this.state.queryType}
      title={this.state.title}
      searchTerm={this.state.searchTerm}
    />
  }

  renderMediaIcons = () => {
    return(
      <div>
        {this.state.music_url.includes('soundcloud.com') ? <a target="_blank" rel="noopener noreferrer" href={this.state.music_url}>
          <img style={{width:'20px', height:'15px'}} src="https://image.flaticon.com/icons/svg/49/49336.svg" alt="SoundCloud"/>
        </a> : null}
        {this.state.music_url.includes('spotify.com') ? <a target="_blank" rel="noopener noreferrer" href={this.state.music_url}>
          <img style={{width:'20px', height:'15px'}} src="https://image.flaticon.com/icons/svg/8/8710.svg" alt="Spotify"/>
        </a> : null}
        {this.state.youtube_url ? <a target="_blank" rel="noopener noreferrer" href={this.state.youtube_url}>
          <img style={{width:'20px', height:'15px'}} src="https://image.flaticon.com/icons/svg/49/49411.svg" alt="YouTube"/>
        </a> : null}
      </div>
    )
  }

  renderAlbums = () => this.state.albums.length === 0 ? null : (
    <div>
    {
      this.state.albums.map(album => (
        <Link to={`/albums/#${album.slug}`} className="ui gray small label" key={album.id}>
          <i>{album.title}</i>
        </Link>
      ))
    }
    </div>
  )


  renderEditButton = () => this.props.user && this.props.user.admin ? (<div>
      <Link to={`/songs/${this.state.slug}/edit`}>
        <button className="ui button">
          Edit Song
        </button>
      </Link>
    </div>
  ) : null

  renderLyricsOptions = () => this.props.user && this.props.user.admin ? (
    <LyricsFormatOptions value={this.state.radioButton}/>
  ) : null

  render(){
    return this.state.notFound ? <NotFound/> : (
      this.state.loading ? <ScaleLoader/> : (
        <React.Fragment>
          <div className="ui segment">
            <div className="ui container">
              <h2>{this.state.title}</h2>
              {this.renderAlbums()}
              {this.renderMediaIcons()}
              {
                this.state.translator ? <p>{`Translation by `}
                  <a target="_blank" rel="noopener noreferrer"  href={this.state.translator_url}>
                    {this.state.translator}
                  </a>
                </p> : null
              }
            </div>
            <div className="ui container lyrics-box" style={{marginTop: "40px", marginBottom: "20px"}}>
              {this.renderLyricsBox()}
            </div>
            {
              this.renderEditButton()
            }
          </div>
        </React.Fragment>
      )
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps)(SongDetails))
