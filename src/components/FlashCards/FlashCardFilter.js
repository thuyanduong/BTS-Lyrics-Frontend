import React from 'react'
import textColor from '../../_helpers/textColor'
import {withRouter} from 'react-router-dom'
import {resetActiveCategory, toggleLanguage, sortFlashCards} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import { Dropdown, Search, Icon} from 'semantic-ui-react'

class FlashCardFilter extends React.Component {
  redirect = (e, url) => {
    this.props.history.push(url)
  }

  renderCatergoryLabel = () => {
    let {activeCategory, resetActiveCategory, flashCardSearchText} = this.props
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
    }else if(!activeCategory && flashCardSearchText === ""){
      return (
        <div className="ui label">
          All Flashcards
        </div>
      )
    }else{
      return null
    }
  }

  renderCountLabel = () => {
    return <div className="ui label">
      {this.props.count}
    </div>
  }

  renderSearchbar = () => {
    let {flashCardSearchText, onChange, sortBy, sortFlashCards} = this.props
    return (
      <div className="ui form">
        <div className="field">
          <div className="two fields">
            <div className="field">
              <Search
                fluid
                type="text"
                name="flashCardSearchText"
                placeholder="Search Flashcards"
                value={flashCardSearchText}
                onSearchChange={(e)=>onChange(e.target.name, e.target.value)}
                showNoResults={false}
                icon={
                  flashCardSearchText === "" ?
                  <Icon name='search'/> :
                  <Icon name='delete' link onClick={(e)=>onChange("flashCardSearchText", "")}/>
                }
              />
            </div>
            <div className="field">
              <Dropdown
                clearable
                placeholder='Sort Flashcards'
                selection
                onChange={(e, data) => sortFlashCards(data.value)}
                value={sortBy}
                options={[
                    {
                      key: 'Most Recent',
                      text: 'Most Recent',
                      value: 'Most Recent'
                    },
                    {
                      key: 'Newest',
                      text: 'Newest',
                      value: 'Newest'
                    },
                    {
                      key: 'Oldest',
                      text: 'Oldest',
                      value: 'Oldest'
                    },
                    {
                      key: 'Alphabetical',
                      text: 'Alphabetical',
                      value: 'Alphabetical'
                    }
                  ]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderToggle = () => {
    return (
      <div className="ui animated button" onClick={this.props.toggleLanguage}>
        <div className="visible content">
          {
            this.props.language === "Korean" ?
            <i className="big kr flag" style={{marginRight: 0}}></i> :
            <i className="big us flag" style={{marginRight: 0}}></i>
          }
        </div>
        <div className="hidden content">
        {
          this.props.language === "English" ?
          <i className="big kr flag" style={{marginRight: 0}}></i> :
          <i className="big us flag" style={{marginRight: 0}}></i>
        }
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="ui segment filter">
        {this.renderSearchbar()}
        <div className="ui form" style={{marginTop: "1em"}}>
          {this.renderCatergoryLabel()}
          {this.renderCountLabel()}
          <div style={{float:'right'}}>
            <span className="blue link" style={{marginRight: "1em"}}
              onClick={this.props.resetFilter}
            >Reset Filters</span>
            {this.renderToggle()}
            <div className="ui button" onClick={(e) => this.redirect(e, `/flash-cards/new`)}>
              <i className="plus icon"></i>
              New Flashcard
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCategory: state.activeCategory,
  language: state.flashCardFront,
  sortBy: state.sortFlashCards
})

export default withRouter(connect(mapStateToProps,
  {resetActiveCategory, toggleLanguage, sortFlashCards}
)(FlashCardFilter))
