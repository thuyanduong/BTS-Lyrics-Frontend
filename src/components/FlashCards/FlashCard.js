import React from 'react'
import {withRouter} from 'react-router-dom'
import ReactCardFlip from 'react-card-flip';
import {connect} from 'react-redux'

class FlashCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      showExpandFront: false,
      showExpandBack: false
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

  render() {
    let {activeCategory, card} = this.props
    let style = {
      borderColor: activeCategory ? activeCategory.color : "rgba(0,0,0,0)",
      borderBottomWidth: (typeof activeCategory === 'string') ? '0' : '0.1em'
    }
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" >
        <div className="ui flash-card" style={style}
          onClick={this.handleClick}
          onMouseEnter={()=>this.setState({showExpandFront: true})}
          onMouseLeave={()=>this.setState({showExpandFront: false})}
        >
          {this.state.showExpandFront ?
          <div className="hover-flash-card" style={{position: 'absolute', top: 0, right: 0, height: '20px'}}>
            <i className="grey external alternate icon small" style={{display:'block', marginTop:'0.25em'}}
              onClick={(e)=>{this.redirect(e, `/flash-cards/${card.id}`)}}
            ></i>
          </div> :
          null}
          <span>
            {this.props.language === "Korean" ? card.korean : card.english}
          </span>
        </div>
        <div className="ui flash-card" style={style}
          onMouseEnter={()=>this.setState({showExpandBack: true})}
          onMouseLeave={()=>this.setState({showExpandBack: false})}
        >
          {this.state.showExpandBack ?
          <div className="hover-flash-card" style={{position: 'absolute', top: 0, right: 0, height: '20px'}}>
            <i className="grey external alternate icon small" style={{display:'block', marginTop:'0.25em'}}
              onClick={(e)=>{this.redirect(e, `/flash-cards/${card.id}`)}}
            ></i>
          </div> :
          null}
          <span>
            {this.props.language === "Korean" ? card.english : card.korean}
          </span>
        </div>
      </ReactCardFlip>
    )
  }
}

const mapStateToProps = state => ({
  activeCategory: state.activeCategory,
  language: state.flashCardFront
})

export default withRouter(connect(mapStateToProps)(FlashCard))
