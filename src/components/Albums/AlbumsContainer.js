import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NotFound from '../NotFound'
import AlbumForm from './AlbumForm'
import AlbumsList from './AlbumsList'

class AlbumsContainer extends React.PureComponent{
  render(){
    return(
      <Switch>
        <Route exact path="/albums" component={AlbumsList} />
        <Route exact path="/albums/new" component={AlbumForm} />
        <Route exact path="/albums/:slug/edit" component={AlbumForm} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default AlbumsContainer
