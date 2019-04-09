import React from 'react'
import {withRouter} from 'react-router-dom'
import matchLine from '../../_helpers/matchLine'
import {Link} from 'react-router-dom'

class ResultItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      queryType: this.props.query.split("=")[0],
      searchTerm: this.props.query.split("=")[1],
      lyricsArray: props.song.lyrics.split("\n"),
      transArray: props.song.translation.split("\n")
    }
  }

  getTitle = () => (
    <div className="ui black label">
      <Link to={`/songs/${this.props.song.slug}${this.props.location.search}`}>
        <i>{this.props.song.title}</i>
      </Link>
    </div>
  )

  getLines = () => {
    let isLyrics = this.state.queryType === "lyrics"
    let array = isLyrics ? this.state.lyricsArray : this.state.transArray
    let index = array.findIndex(line => matchLine(line, this.state.searchTerm))
    return (
      <React.Fragment>
        <div className={isLyrics ? "bold" : ""}>
          {this.state.lyricsArray[index]}
        </div>
        <div className={isLyrics ? "" : "bold"}>
          {this.state.transArray[index]}
        </div>
      </React.Fragment>
    )
  }

  render(){
    return(
      <li className="list-group-item">
      {
        this.getLines()
      }
      {
        this.getTitle()
      }
      </li>
    )
  }
}

export default withRouter(ResultItem)
