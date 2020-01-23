import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NotFound from '../NotFound'
import AlbumForm from './AlbumForm'
import AlbumsList from './AlbumsList'
import AlbumTracksForm from './AlbumTracksForm'
import {fetchingData} from '../../redux/actionCreators'
import {connect} from 'react-redux'

class AlbumsContainer extends React.PureComponent{
  componentDidMount(){
    if(this.props.albumTypes.length === 0){
      this.props.fetchingData()
    }
  }

  render(){
    return(
      <Switch>
        <Route exact path="/albums" component={AlbumsList} />
        <Route exact path="/albums/new" component={AlbumForm} />
        <Route exact path="/albums/:slug/edit" component={AlbumForm} />
        <Route exact path="/albums/:slug/edit/tracks" component={AlbumTracksForm} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  albumTypes: state.albumTypes
})

export default connect(mapStateToProps, {fetchingData})(AlbumsContainer)
