import React from 'react'
import ResultItem from './ResultItem'

class SearchResultsList extends React.PureComponent{
  generateResultItem = (song) => {
    return (
      <ResultItem
        key={song.id}
        song={song}
        query={this.props.query}
      />
    )
  }

  render(){
    return(
      this.props.results.length > 0
        ?
      <div className="ui container segment">
        <ul className="ui relaxed divided list">
          {this.props.results.map(song => this.generateResultItem(song))}
        </ul>
      </div>
        :
      <div>No Results Found</div>
    )
  }
}

export default SearchResultsList
