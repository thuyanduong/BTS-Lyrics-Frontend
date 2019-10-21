import React, { PureComponent } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import NotFound from './components/NotFound'
import SearchResultsPage from './components/SearchResults/SearchResultsPage'
import SongContainer from './components/Songs/SongContainer'
import AlbumsContainer from './components/Albums/AlbumsContainer'
import {fetchingData, fetchingSongs} from './redux/actionCreators'
import {connect} from 'react-redux'
import Navbar from './components/Home/Navbar'

class App extends PureComponent {
  componentDidMount(){
    this.props.fetchingData()
    this.props.fetchingSongs()
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/albums" component={AlbumsContainer} />
          <Route path="/songs" component={SongContainer} />
          <Route path="/search-results" component={SearchResultsPage}/>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}


export default connect(null, {fetchingData, fetchingSongs})(App);
