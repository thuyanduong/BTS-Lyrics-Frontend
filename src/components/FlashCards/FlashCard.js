import React from 'react'
import {withRouter} from 'react-router-dom'
import ReactCardFlip from 'react-card-flip'
import {connect} from 'react-redux'

class FlashCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      showIcons: false
    }
  }

  flipBack = () => {
    this.setState({isFlipped: false})
  }

  handleClick = (e) => {
    e.preventDefault();
    if(!this.state.isFlipped){
      this.setState({isFlipped: true})
      setTimeout(this.flipBack, 1500)
    }
  }

  redirect = (e, url) => {
    e.stopPropagation()
    this.props.history.push(url)
  }

  renderCard = (element) => {
    let {activeCategory, card} = this.props
    let style = {
      borderColor: activeCategory ? activeCategory.color : "rgba(0,0,0,0)",
      borderBottomWidth: (typeof activeCategory === 'string') ? '0' : '0.1em'
    }
    return (
      <div className="ui flash-card" style={style}
        onClick={this.handleClick}
        onMouseEnter={()=>this.setState({showIcons: true})}
        onMouseLeave={()=>this.setState({showIcons: false})}
      >
        {this.state.showIcons ?
        <div className="hover-flash-card" style={{position: 'absolute', top: 0, right: 0, height: '20px'}}>
          <i className="grey external alternate icon small" style={{display:'block', marginTop:'0.25em'}}
            onClick={(e)=>{this.redirect(e, `/flash-cards/${card.id}`)}}
          ></i>
        </div> :
        null}
        {element}
      </div>
    )
  }

  renderKoreanSide = () => {
    let child = (
      <span>
        {this.props.card.korean}
      </span>
    )
    return this.renderCard(child)
  }

  renderEnglishSide = () => {
    let child = (
      <span>
        {this.props.card.english}
      </span>
    )
    return this.renderCard(child)
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" >
        {this.props.language === "Korean" ? this.renderKoreanSide() : this.renderEnglishSide()}
        {this.props.language === "Korean" ? this.renderEnglishSide() : this.renderKoreanSide()}
      </ReactCardFlip>
    )
  }
}

const mapStateToProps = state => ({
  activeCategory: state.activeCategory,
  language: state.flashCardFront
})

export default withRouter(connect(mapStateToProps)(FlashCard))
