import React from 'react'
import {withRouter} from 'react-router-dom'
import NotFound from '../NotFound'
import URL from '../../_helpers/url'
import {ScaleLoader} from 'react-spinners'
import {HashLink as Link} from 'react-router-hash-link';
import removeWhiteSpace from '../../_helpers/removeWhiteSpace'
//styling

class SongDetails extends React.PureComponent{
  state = {
    loading: true,
    notFound: false,

    slug: '',
    title: '',
    lyrics: '',
    translation: '',
    queryType: 'none',
    searchTerm: '',
    albums: []
  }

  componentDidMount(){
    this.fetchSong()
    let [queryType, searchTerm] = this.props.location.search.split("=")
    if(queryType.includes('lyrics')){
      this.setState({queryType: 'lyrics', searchTerm})
    }else if(queryType.includes('translation')){
      this.setState({queryType: 'translation', searchTerm})
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

  renderHighLightedSpan = (type, line) => {
    if(!line){
      return '<span>&nbsp;</span>'
    }
    if(type !== this.state.queryType){return line}
    let reg = `(${removeWhiteSpace(this.state.searchTerm).split('').join('\\s*')})`
    let regExp = new RegExp(reg, 'gi');
    let span = line.replace(regExp, '<span class="highlight">$1</span>');
    return span
  }

  renderLyricsBox = () => {
    let lyricsArray = this.state.lyrics.split('\n')
    let transArray = this.state.translation.split('\n')
    let mainArray = transArray.length > lyricsArray.length ? transArray :lyricsArray
    return(
      mainArray[0].length ? mainArray.map((x, index) => {
        return (
          <div className="ui grid" key={index}>
            <span className="eight wide column lyrics lyrics-row"
              dangerouslySetInnerHTML={{__html: this.renderHighLightedSpan('lyrics', lyricsArray[index])}}>
            </span>
            <span className="eight wide column translation lyrics-row"
                dangerouslySetInnerHTML={{__html: this.renderHighLightedSpan('translation', transArray[index])}}>
            </span>
          </div>
        )
      }) : null
    )
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

  renderAlbum = () => {
    return this.state.albums.length === 0 ? null : (<div className="ui black label">
        <Link to={`/albums/#${this.state.albums[0].slug}`}>
          <i>{this.state.albums[0].title}</i>
        </Link>
      </div>
    )
  }

  render(){
    return this.state.notFound ? <NotFound/> : (
      this.state.loading ? <ScaleLoader/> : (
        <div>
          <div className="ui segment song-container">
            <div className="container">
              <h2>{this.state.title}</h2>
              {this.renderAlbum()}
              {this.renderMediaIcons()}
              {
                this.state.translator ? <p>{`Translation by `}
                  <a target="_blank" rel="noopener noreferrer"  href={this.state.translator_url}>
                    {this.state.translator}
                  </a>
                </p> : null
              }
            </div>
            <div className="container lyrics-box" style={{marginTop: "40px", marginBottom: "20px"}}>
              {this.renderLyricsBox()}
            </div>
          </div>
          {
            <div>
              <Link to={`/songs/${this.state.slug}/edit`}>
                <button>
                  Edit Song
                </button>
              </Link>
            </div>
          }
        </div>
      )
    )
  }
}

export default withRouter(SongDetails)
