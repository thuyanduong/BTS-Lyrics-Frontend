import React from 'react'
import FlashCard from './FlashCard'
import {connect} from 'react-redux'

class FlashCardsList extends React.Component {
  sortFunction = () => {
    switch (this.props.sortBy) {
      case "Newest":
        return (a, b) => b.created_at.localeCompare(a.created_at)
      case "Oldest":
        return (a, b) => a.created_at.localeCompare(b.created_at)
      case "Most Recent":
        return (a, b) => b.updated_at.localeCompare(a.updated_at)
      case "Alphabetical":
        return (a, b) => a.english.localeCompare(b.english)
      default:
        return (a, b) => 0
    }
  }

  sortedFlashCards = () => {
    return this.props.flashCards.sort(this.sortFunction())
  }

  render(){
    let cards = this.sortedFlashCards()
    return (
      <div className="ui segment vertical">
        <div className="ui cards">
          {cards.map(card => <FlashCard
            key={card.id}
            card={card}
          />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sortBy: state.sortFlashCards
})

export default connect(mapStateToProps)(FlashCardsList)
