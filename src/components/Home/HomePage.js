import React from 'react'
import LyricsSearcher from './LyricsSearcher'
import TranslationSearcher from './TranslationSearcher'

const HomePage = () => {
  return(
    <div className="ui container segment">
      <h1>Search For Lyrics</h1>
        <div className="ui divider hidden"></div>
        <LyricsSearcher/>
        <div className="ui divider hidden"></div>
        <TranslationSearcher/>
    </div>
  )
}

export default HomePage
