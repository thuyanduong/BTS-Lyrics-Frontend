import React from 'react'
import FlashCard from './FlashCard'

const FlashCardsList = (props) => {
  return (
    <div className="ui segment vertical">
      <div className="ui cards">
        {props.flashCards.map(card => <FlashCard
          key={card.id}
          card={card}
        />)}
      </div>
    </div>
  )
}

export default FlashCardsList
