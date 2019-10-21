import React from 'react'
import {connect} from 'react-redux'
import ResultItem from './ResultItem'
import shuffle from '../../_helpers/shuffleArray'
//styling

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
      <ul className="list-group">
        {this.props.results.map(song => this.generateResultItem(song))}
      </ul>
        :
      <div>No Results Found</div>
    )
  }
}
const mapStateToProps = state => ({
  results: shuffle([...state.searchResults]),
  query: state.query
})
export default connect(mapStateToProps)(SearchResultsList)
