import {combineReducers} from 'redux'
import {FETCHED_RESULTS, ADD_ALBUM, ADD_SONG, UPDATE_SONG, DELETE_SONG,
  LOADING, UPDATE_ALBUM, FETCHED_DATA, DELETE_ALBUM, LOADING_SEARCH_RESULTS} from './actions'

const initialState = {
  searchResults: [],
  query: "",
  albums: [],
  loading: false,
  loadingSearchResults: false
}

function searchResultsReducer(state=initialState.searchResults, action){
  switch(action.type){
    case FETCHED_RESULTS:
      return action.results.songs
    default:
      return state
  }
}

function queryReducer(state=initialState.query, action){
  switch(action.type){
    case FETCHED_RESULTS:
      return action.results.query
    default:
      return state
  }
}

function albumsReducer(state=initialState.albums, action){
  switch(action.type){
    case FETCHED_DATA:
      return action.albums
    case ADD_ALBUM: {
      //Find the albumsList this album is in, add the album, and sort
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums.unshift(action.album)
      albums.sort((a,b) => b.release_date.localeCompare(a.release_date))
      return [...state]
    }
    case UPDATE_ALBUM: {
      //Find the albumsList this album is in, reassign the value, and sort
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums[albums.indexOf(albums.find(album => album.id === action.album.id))] = action.album
      albums.sort((a,b) => b.release_date.localeCompare(a.release_date))
      return [...state]
    }
    case DELETE_ALBUM: {
      //Find the albumsList this album is in, filter it out, no need to sort
      let category = state[state.indexOf(state.find(category => category.id === action.album.album_type_id))]
      category.albums = category.albums.filter(a => a.id !== action.album.id)
      return [...state]
    }
    case ADD_SONG: {
      //Find the albumsList this song is in, then find the songList, add the song, and sort
      let albums = state.find(category => category.id === action.song.album_type_id).albums
      let songs = albums.find(album => album.id === action.song.album_id).songs
      songs.push(action.song)
      songs.sort((a,b) => a.track_number - b.track_number)
      return [...state]
    }
    case UPDATE_SONG: {
      //Find the albumsList this song is in, then find the songList, reassign the value, and sort
      let albums = state.find(category => category.id === action.song.album_type_id).albums
      let songs = albums.find(album => album.id === action.song.album_id).songs
      songs[songs.indexOf(songs.find(song => song.id === action.song.id))] = action.song
      songs.sort((a,b) => a.track_number - b.track_number)
      return [...state]
    }
    case DELETE_SONG: {
      //Find the albumsList this song is in, then find the songList, filter it out, no need to sort
      // debugger
      let category = state[state.indexOf(state.find(category => category.id === action.song.album_type_id))]
      let album = category.albums.find(album => album.id === action.song.album_id)
      album.songs = album.songs.filter(a => a.id !== action.song.id)
      return [...state]
    }
    default:
      return state
  }
}

function loadingReducer(state=initialState.loading, action){
  switch(action.type){
    case FETCHED_DATA:
      return false
    case LOADING:
      return true
    default:
      return state
  }
}

function loadingSearchResultsReducer(state=initialState.loadingSearchResults, action){
  switch(action.type){
    case FETCHED_RESULTS:
      return false
    case LOADING_SEARCH_RESULTS:
      return true
    default:
      return state
  }
}

export default combineReducers({
  searchResults: searchResultsReducer,
  albums: albumsReducer,
  loading: loadingReducer,
  loadingSearchResults: loadingSearchResultsReducer,
  query: queryReducer
})
