import React from 'react'
import {withRouter} from 'react-router-dom'
import {getParameterByType} from '../../_helpers/urlQuery'
import SearchResultsList from './SearchResultsList'
import {fetchingResults} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import {ScaleLoader} from 'react-spinners'
//styling

class SearchResultsPage extends React.PureComponent{
  componentDidMount(){
    this.props.fetchingResults(this.props.location.search)
  }

  renderQuery(){
    let lyrics = getParameterByType('lyrics',this.props.location.search)
    let translation = getParameterByType('translation',this.props.location.search)
    return (lyrics ?
    <div>Lyrics = {lyrics}</div> : (
      translation ? <div>Translation = {translation}</div> :
      (null)
    ))
  }

  render(){
    return( this.props.loading ? <ScaleLoader/> :
      <div>Search Results
        {this.renderQuery()}
        <SearchResultsList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading : state.loadingSearchResults
})

const mapDispatchToProps = dispatch => ({
  fetchingResults: (query) => {dispatch(fetchingResults(query))}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage))
