import React from 'react'
import LyricsSearcher from './LyricsSearcher'
import TranslationSearcher from './TranslationSearcher'

const SearchForm = () => {
  return(
    <div className="ui container segment" style={{backgroundColor: "#f8f8f9"}}>
      <h1>Search For Lyrics</h1>
        <div className="ui divider hidden"></div>
        <LyricsSearcher/>
        <div className="ui divider hidden"></div>
        <TranslationSearcher/>
    </div>
  )
}

export default SearchForm
