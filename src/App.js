import React, { PureComponent } from 'react';
import './App.css';
import {withRouter, Switch, Route} from 'react-router-dom'
import SearchForm from './components/Search/SearchForm'
import NotFound from './components/NotFound'
import SearchResultsPage from './components/SearchResults/SearchResultsPage'
import SongContainer from './components/Songs/SongContainer'
import AlbumsContainer from './components/Albums/AlbumsContainer'
import {fetchingUser} from './redux/actionCreators'
import {connect} from 'react-redux'
import Navbar from './components/Navbar'
import LogInForm from './components/SignIn/LogInForm'
import SignUpForm from './components/SignIn/SignUpForm'
import FlashCardsContainer from './components/FlashCards/FlashCardsContainer'

class App extends PureComponent {
  componentDidMount(){
    this.props.fetchingUser()
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        {
          !this.props.loading ? <Switch>
            {
              this.props.user
              ?
              <Route exact path={["/", "/categories/new", "/categories/edit/:id", "/flash-cards/:id", "/flash-cards/edit/:id"]} component={FlashCardsContainer} />
              :
              <Route exact path="/" component={SearchForm} />
            }
            <Route path="/albums" component={AlbumsContainer} />
            <Route path="/songs" component={SongContainer} />
            <Route exact path="/search" component={SearchForm} />
            <Route exact path="/search-results" component={SearchResultsPage} />
            <Route exact path="/login" component={LogInForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route component={NotFound} />
          </Switch> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
  loading: state.loadingCurrentUser
})

export default withRouter(connect(mapStateToProps, {fetchingUser})(App));
