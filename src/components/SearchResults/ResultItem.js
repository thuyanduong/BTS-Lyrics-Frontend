import React from 'react'
import {withRouter} from 'react-router-dom'
import matchLine from '../../_helpers/matchLine'
import {Link} from 'react-router-dom'
//styling

class ResultItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      queryType: this.props.query.lyrics ? "lyrics" : "translation",
      searchTerm: this.props.query.lyrics ? this.props.query.lyrics : this.props.query.translation,
      lyricsArray: props.song.lyrics.split("\n"),
      transArray: props.song.translation.split("\n")
    }
  }

  getTitle = () => (
    <div className="ui gray label">
      <Link to={`/songs/${this.props.song.slug}${this.props.location.search}`}>
        <i>{this.props.song.title}</i>
      </Link>
    </div>
  )

  getLines = () => {
    let isLyrics = this.state.queryType === "lyrics"
    let array = isLyrics ? this.state.lyricsArray : this.state.transArray
    let index = array.findIndex((line, i) => matchLine(line, this.state.searchTerm))
    return (
      <React.Fragment>
        <p className={isLyrics ? "bold" : ""}>
          {this.state.lyricsArray[index]}
        </p>
        <p className={isLyrics ? "" : "bold"}>
          {this.state.transArray[index]}
        </p>
      </React.Fragment>
    )
  }

  render(){
    return(
      <div className="item">
      {
        this.getLines()
      }
      {
        this.getTitle()
      }
      </div>
    )
  }
}

export default withRouter(ResultItem)
