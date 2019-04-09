import React, { PureComponent } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import NotFound from './components/NotFound'
import SearchResultsPage from './components/SearchResults/SearchResultsPage'
import SongContainer from './components/Songs/SongContainer'
import AlbumsContainer from './components/Albums/AlbumsContainer'
import {fetchingData} from './redux/actionCreators'
import {connect} from 'react-redux'
import Navbar from './components/Home/Navbar'
import LyricsSearcher from './components/Home/LyricsSearcher'
import TranslationSearcher from './components/Home/TranslationSearcher'

class App extends PureComponent {
  componentDidMount(){
    this.props.fetchingData()
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/albums" component={AlbumsContainer} />
          <Route path="/songs" component={SongContainer} />
          <Route path="/search-lyrics" component={LyricsSearcher} />
          <Route path="/search-translation" component={TranslationSearcher}/>
          <Route path="/search-results" component={SearchResultsPage}/>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchingData: ()=>{dispatch(fetchingData())}
})

export default connect(null, mapDispatchToProps)(App);
