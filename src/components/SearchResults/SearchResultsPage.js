import React from 'react'
import {withRouter} from 'react-router-dom'
import {getParameterByType} from '../../_helpers/urlQuery'
import SearchResultsList from './SearchResultsList'
import {ScaleLoader} from 'react-spinners'
import shuffle from '../../_helpers/shuffleArray'
import URL from '../../_helpers/url'
import queryString from 'query-string'

class SearchResultsPage extends React.PureComponent{
  constructor(props){
    super()
    this.state = {
        query: queryString.parse(props.location.search),
        results: [],
        loading: true
      }
  }

  componentDidMount(){
    fetch(`${URL}/search${this.props.location.search}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        results: shuffle(data.songs),
        loading: false
      })
    }).catch(() => {
      this.setState({loading: false})
    })
  }

  renderQuery(){
    let lyrics = getParameterByType('lyrics',this.props.location.search)
    let translation = getParameterByType('translation',this.props.location.search)
    return (
      lyrics ? <h5>Lyrics = {lyrics}</h5> :
    (
      translation ? <h5>Translation = {translation}</h5> :
      (null)
    ))
  }

  render(){
    return( this.state.loading ? <ScaleLoader/> :
      <div>
        <h2>Search Results</h2>
        {this.renderQuery()}
        <SearchResultsList query={this.state.query} results={this.state.results}/>
      </div>
    )
  }
}

export default withRouter(SearchResultsPage)
