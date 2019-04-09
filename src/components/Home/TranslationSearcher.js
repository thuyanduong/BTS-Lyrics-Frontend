import React from 'react'
import {withRouter} from 'react-router-dom'

class TranslationSearcher extends React.PureComponent{
  state = {
    searchTerm: ''
  }

  onChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  redirect = () => {
    this.props.history.push(`/search-results?translation=${this.state.searchTerm}`)
  }

  render(){
    return(
      <div>
        <div className="ui fluid action input">
          <input onChange={this.onChange} type="text" placeholder="Search By Translation..." />
          <div onClick={this.redirect}
            className="ui button">Search By Translation
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TranslationSearcher)
