import {combineReducers} from 'redux'
import {FETCHED_RESULTS, CREATE_ALBUM, CREATE_SONG, UPDATE_SONG, DELETE_SONG,
  LOADING_DATA, UPDATE_ALBUM, FETCHED_DATA, DELETE_ALBUM, LOADING_SEARCH_RESULTS,
  UPDATE_TRACKS, LOADING_SONGS, FETCHED_SONGS} from './actions'

const initialState = {
  searchResults: [],
  query: "",
  songs: [],
  loadingSongs: false,
  albumTypes: [],
  loadingData: false,
  loadingSearchResults: false
}

function songsReducer(state=initialState.songs, action){
  switch (action.type) {
    case FETCHED_SONGS:
      return action.songs
    case CREATE_SONG:
      return [...state, action.song].sort((a, b) => a.title.localeCompare(b.title))
    case DELETE_SONG: {
      let newState = [...state]
      let index = newState.findIndex(song => song.id === action.song.id)
      newState.splice(index, 1)
      return newState
    }
    case UPDATE_SONG: {
      let newState = [...state]
      let index = newState.findIndex(song => song.id === action.song.id)
      newState[index] = action.song
      return newState.sort((a, b) => a.title.localeCompare(b.title))
    }
    default:
      return state
  }
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

function albumTypesReducer(state=initialState.albumTypes, action){
  switch(action.type){
    case FETCHED_DATA:
      return action.albums
    case CREATE_ALBUM: {
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums.unshift(action.album)
      albums.sort((a,b) => a.release_date.localeCompare(b.release_date))
      return [...state]
    }
    case UPDATE_ALBUM: {
      state.forEach(albumType => {
        albumType.albums = albumType.albums.filter(album => album.id !== action.album.id)
      })
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums.push(action.album)
      albums.sort((a,b) => a.release_date.localeCompare(b.release_date))
      return [...state]
    }
    case DELETE_ALBUM: {
      let category = state[state.indexOf(state.find(category => category.id === action.album.album_type_id))]
      category.albums = category.albums.filter(a => a.id !== action.album.id)
      return [...state]
    }
    case UPDATE_TRACKS: {
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      let album = albums.find(a => a.id === action.album.id)
      album.tracks = action.album.tracks
      return [...state]
    }
    case UPDATE_SONG: {
      action.song.tracks.forEach( track => {
        let albumType = state.find(albumType => albumType.id === track.album.album_type_id)
    		let album = albumType.albums.find(album => album.id === track.album.id)
    		let t = album.tracks.find(track => track.song.id === action.song.id)
        t.song = {...action.song}
        delete t.song.tracks
      })
      return [...state]
    }
    case DELETE_SONG: {
      action.song.tracks.forEach( track => {
        let albumType = state.find(albumType => albumType.id === track.album.album_type_id)
    		let tracks = albumType.albums.find(album => album.id === track.album.id).tracks
    		tracks = tracks.filter(t => t.song.id !== action.song.id)
      })
      return [...state]
    }
    default:
      return state
  }
}

function loadingDataReducer(state=initialState.loadingData, action){
  switch(action.type){
    case FETCHED_DATA:
      return false
    case LOADING_DATA:
      return true
    default:
      return state
  }
}

function loadingSongsReducer(state=initialState.loadingSongs, action){
  switch(action.type){
    case FETCHED_SONGS:
      return false
    case LOADING_SONGS:
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
  albumTypes: albumTypesReducer,
  loadingData: loadingDataReducer,
  loadingSearchResults: loadingSearchResultsReducer,
  query: queryReducer,
  songs: songsReducer,
  loadingSongs: loadingSongsReducer
})
