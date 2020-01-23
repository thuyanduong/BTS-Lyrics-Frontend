import React from 'react'
import textColor from '../../_helpers/textColor'
import {withRouter} from 'react-router-dom'
import {resetActiveCategory} from '../../redux/actionCreators'
import {connect} from 'react-redux'

class Filterbar extends React.Component {
  renderLabel = () => {
    let {activeCategory, isFiltered, resetActiveCategory} = this.props
    if(activeCategory){
      let {color} = activeCategory
      return (
        <div
        style={{backgroundColor: color, color: textColor(color)}}
        className="ui label">
          {activeCategory.name}
          <i className="delete icon" onClick={resetActiveCategory}></i>
        </div>
      )
    }else if(!activeCategory && !isFiltered){
      return (
        <div className="ui label">
          All Flash Cards
        </div>
      )
    }else{ //!activeCategory && isFiltered
      return null
    }
  }

  renderSearchbar = () => {
    return (
        <div className="ui icon field input">
          <input
            className="prompt"
            type="text"
            name="searchTerm"
            placeholder="Search Flashcards..."
            onChange={this.props.changeFilter}
          />
          <i className="search icon"></i>
      </div>
    )
  }

  redirect = (e, url) => {
    this.props.history.push(url)
  }

  render(){
    return (
      <div className="ui segment filter">
        {this.renderSearchbar()}
        <div style={{marginTop: "1em"}}>
          {this.renderLabel()}
        </div>
        <div style={{float:'right'}}>
          <div className="ui button" onClick={(e) => this.redirect(e, `/flash-cards/new`)} style={{marginBottom: '1em'}}>
            <i className="plus icon"></i>
            New Flash Card
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCategory: state.activeCategory
})

export default withRouter(connect(mapStateToProps, {resetActiveCategory})(Filterbar))
