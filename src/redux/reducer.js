import {combineReducers} from 'redux'
import ACTIONTYPE from './actions'
import shuffle from '../_helpers/shuffleArray'

const initialState = {
  albumTypes: [],
  loadingData: true,

  songs: [],
  loadingSongs: true,

  currentUser: null,
  loadingCurrentUser: true,

  categories: [],
  activeCategory: null,
  allFlashCards: [],
  recentFlashCards: [],

  flashCardFront: "Korean",
  sortCategories: "",
  sortFlashCards: ""
}

function sortCategoriesReducer(state=initialState.sortCategories, action){
  switch (action.type) {
    case ACTIONTYPE.SORT_CATEGORIES:
      return action.sortBy
    default:
      return state
  }
}

function sortFlashCardsReducer(state=initialState.sortFlashCards, action){
  switch (action.type) {
    case ACTIONTYPE.SORT_FLASH_CARDS:
      return action.sortBy
    default:
      return state
  }
}

function flashCardFrontReducer(state = initialState.flashCardFront, action){
  switch (action.type) {
    case ACTIONTYPE.TOGGLE_LANGUAGE:
      return state === "Korean" ? "English" : "Korean"
    default:
      return state
  }
}

function allFlashCardsReducer(state = initialState.allFlashCards, action){
  switch (action.type) {
    case ACTIONTYPE.FETCHED_FLASH_CARDS:
      return action.flashCards
    case ACTIONTYPE.CREATE_CARD:
      return [action.flashCard, ...state]
    case ACTIONTYPE.DELETE_CARD:
      return state.filter(flashCard => flashCard.id !== action.flashCard.id)
    case ACTIONTYPE.UPDATE_CARD:
      return [action.flashCard, ...state.filter(flashCard => flashCard.id !== action.flashCard.id)]
    default:
      return state
  }
}

function recentFlashCardsReducer(state = initialState.recentFlashCards, action){
  switch(action.type) {
    case ACTIONTYPE.FETCHED_USER:
      return action.recentFlashCards
    default:
      return state
  }
}

function activeCategoryReducer(state = initialState.activeCategory, action){
  switch (action.type) {
    case ACTIONTYPE.SET_ACTIVE_CATEGORY:
      action.category.flashCards = shuffle(action.flashCards)
      return action.category
    case ACTIONTYPE.RESET_ACTIVE_CATEGORY:
      return null
    case ACTIONTYPE.SHUFFLE_CATEGORY:
      if(state){
        let newState = {...state}
        newState.flashCards = shuffle(action.category.flashCards)
        return newState
      }
      return state
    case ACTIONTYPE.DELETE_CARD:
      if(state){
        let i = state.flashCards.findIndex(flashCard => flashCard.id === action.flashCard.id)
        if(state && i >= 0){
          let newState = {...state}
          newState.flashCards.splice(i, 1)
          return newState
        }
      }
      return state
    case ACTIONTYPE.CREATE_CARD:
      if(state && action.flashCard.categories.find(category => state.id === category.id)){
        let newState = {...state}
        newState.flashCards = [action.flashCard, ...state.flashCards]
        return newState
      }
      return state
    case ACTIONTYPE.UPDATE_CARD:
      if(state){
        if(action.flashCard.categories.find(category => state.id === category.id)){
          if(action.flashCard.old_categories.includes(state.id) && action.flashCard.new_categories.includes(state.id)){
            let newState = {...state}
            let i = newState.flashCards.findIndex(flashCard => flashCard.id === action.flashCard.id)
            newState.flashCards.splice(i, 1, action.flashCard)
            return newState
          }else if(action.flashCard.old_categories.includes(state.id) && !action.flashCard.new_categories.includes(state.id)){
            let newState = {...state}
            let i = newState.flashCards.findIndex(flashCard => flashCard.id === action.flashCard.id)
            newState.flashCards.splice(i, 1)
            return newState
          }
        }else{
          if(!action.flashCard.old_categories.includes(state.id) && action.flashCard.new_categories.includes(state.id)){
            let newState = {...state}
            newState.flashCards = [action.flashCard, ...state.flashCards]
            return newState
          }
        }
      }
      return state
    default:
      return state
  }
}

function categoriesReducer(state = initialState.categories, action){
  switch (action.type) {
    case ACTIONTYPE.FETCHED_USER:
      return action.categories
    case ACTIONTYPE.CREATE_CATEGORY:
      return [...state, action.category]
    case ACTIONTYPE.UPDATE_CATEGORY: {
        let newState = [...state]
        let index = newState.findIndex(category => category.id === action.category.id)
        newState[index].name = action.category.name
        newState[index].color = action.category.color
        return newState
    }
    case ACTIONTYPE.DELETE_CATEGORY: {
      let newState = [...state]
      let index = newState.findIndex(category => category.id === action.category.id)
      newState.splice(index, 1)
      return newState
    }
    default:
      return state
  }
}

function currentUserReducer(state=initialState.currentUser, action){
  switch (action.type) {
    case ACTIONTYPE.FETCHED_USER:
      return action.user
    case ACTIONTYPE.LOGOUT:
      return null
    default:
      return state
  }
}

function loadingCurrentUserReducer(state=initialState.loadingCurrentUser, action){
  switch (action.type) {
    case ACTIONTYPE.FETCHED_USER:
      return false
    default:
      return state
  }
}

function songsReducer(state=initialState.songs, action){
  switch (action.type) {
    case ACTIONTYPE.FETCHED_SONGS:
      return action.songs
    case ACTIONTYPE.CREATE_SONG:
      return [...state, action.song].sort((a, b) => a.title.localeCompare(b.title))
    case ACTIONTYPE.DELETE_SONG: {
      let newState = [...state]
      let index = newState.findIndex(song => song.id === action.song.id)
      newState.splice(index, 1)
      return newState
    }
    case ACTIONTYPE.UPDATE_SONG: {
      let newState = [...state]
      let index = newState.findIndex(song => song.id === action.song.id)
      newState[index] = action.song
      return newState.sort((a, b) => a.title.localeCompare(b.title))
    }
    default:
      return state
  }
}

function albumTypesReducer(state=initialState.albumTypes, action){
  switch(action.type){
    case ACTIONTYPE.FETCHED_DATA:
      return action.albums
    case ACTIONTYPE.CREATE_ALBUM: {
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums.unshift(action.album)
      albums.sort((a,b) => a.release_date.localeCompare(b.release_date))
      return [...state]
    }
    case ACTIONTYPE.UPDATE_ALBUM: {
      state.forEach(albumType => {
        albumType.albums = albumType.albums.filter(album => album.id !== action.album.id)
      })
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      albums.push(action.album)
      albums.sort((a,b) => a.release_date.localeCompare(b.release_date))
      return [...state]
    }
    case ACTIONTYPE.DELETE_ALBUM: {
      let category = state[state.indexOf(state.find(category => category.id === action.album.album_type_id))]
      category.albums = category.albums.filter(a => a.id !== action.album.id)
      return [...state]
    }
    case ACTIONTYPE.UPDATE_TRACKS: {
      let albums = state.find(category => category.id === action.album.album_type_id).albums
      let album = albums.find(a => a.id === action.album.id)
      album.tracks = action.album.tracks
      return [...state]
    }
    case ACTIONTYPE.UPDATE_SONG: {
      action.song.tracks.forEach( track => {
        let albumType = state.find(albumType => albumType.id === track.album.album_type_id)
    		let album = albumType.albums.find(album => album.id === track.album.id)
    		let t = album.tracks.find(track => track.song.id === action.song.id)
        t.song = {...action.song}
        delete t.song.tracks
      })
      return [...state]
    }
    case ACTIONTYPE.DELETE_SONG: {
      action.song.tracks.forEach( track => {
        let albumType = state.find(albumType => albumType.id === track.album.album_type_id)
    		albumType.albums.find(album => album.id === track.album.id).tracks = (
          albumType.albums.find(album => album.id === track.album.id)
          .tracks.filter(t => t.song.id !== action.song.id))
      })
      return [...state]
    }
    default:
      return state
  }
}

function loadingDataReducer(state=initialState.loadingData, action){
  switch(action.type){
    case ACTIONTYPE.FETCHED_DATA:
      return false
    default:
      return state
  }
}

function loadingSongsReducer(state=initialState.loadingSongs, action){
  switch(action.type){
    case ACTIONTYPE.FETCHED_SONGS:
      return false
    default:
      return state
  }
}

export default combineReducers({
  albumTypes: albumTypesReducer,
  loadingData: loadingDataReducer,
  songs: songsReducer,
  loadingSongs: loadingSongsReducer,
  currentUser: currentUserReducer,
  categories: categoriesReducer,
  allFlashCards: allFlashCardsReducer,
  recentFlashCards: recentFlashCardsReducer,
  loadingCurrentUser: loadingCurrentUserReducer,
  activeCategory: activeCategoryReducer,
  flashCardFront: flashCardFrontReducer,
  sortCategories: sortCategoriesReducer,
  sortFlashCards: sortFlashCardsReducer
})
