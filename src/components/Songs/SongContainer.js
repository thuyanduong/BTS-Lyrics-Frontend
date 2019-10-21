import React from 'react'
import {Switch, Route} from 'react-router-dom'
import SongForm from './SongForm'
import SongDetails from './SongDetails'
import NotFound from '../NotFound'
import SongsList from './SongsList'

class SongContainer extends React.PureComponent{
  render(){
    return(
      <Switch>
        <Route exact path="/songs" component={SongsList} />
        <Route exact path="/songs/new" component={SongForm} />
        <Route exact path="/songs/:slug" component={SongDetails} />
        <Route exact path="/songs/:slug/edit" component={SongForm} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default SongContainer
