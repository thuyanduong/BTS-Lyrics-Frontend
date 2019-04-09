import React from 'react'
import {Switch, Route} from 'react-router-dom'
import SongForm from './SongForm'
import SongDetails from './SongDetails'
import NotFound from '../NotFound'

class SongContainer extends React.PureComponent{
  render(){
    return(
      <Switch>
        <Route exact path="/songs/new" component={SongForm} />
        <Route exact path="/songs/:slug" component={SongDetails} />
        <Route exact path="/songs/:id/edit" component={SongForm} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default SongContainer
