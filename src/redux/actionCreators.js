import URL from '../_helpers/url'
import ACTIONTYPE from './actions'
import getOptions from '../_helpers/optionsGenerator'

const fetchingUser = () => {
  return (dispatch) => {
    let token = localStorage.getItem('token')
    if(token){
      fetch(`${URL}/user`, {
        headers: {"Authentication": `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchedUser(data.user_data, data.categories, data.recent_flash_cards))
      })
      .catch(() => {
        dispatch(fetchedUser(null, [], []))
      })
    }else{
      dispatch(fetchedUser(null, [], []))
    }
  }
}

const fetchingData = () => {
  return (dispatch) => {
    fetch(`${URL}/bts`)
    .then(res => res.json())
    .then(albums => {
      dispatch(fetchedData(albums))
    })
    .catch(() => {
      dispatch(fetchedData([]))
    })
  }
}

const fetchingSongs = () => {
  return (dispatch) => {
    fetch(`${URL}/songs`)
    .then(res => res.json())
    .then(songs => {
      dispatch(fetchedSongs(songs))
    })
    .catch(() => {
      dispatch(fetchedSongs([]))
    })
  }
}

const fetchingFlashCards = () => {
  return (dispatch) => {
    let token = localStorage.getItem('token')
    if(token){
      fetch(`${URL}/flash-cards`, {
        headers: {"Authentication": `Bearer ${token}`}
      }).then(res => res.json())
      .then(flashCards => {
        dispatch(fetchedFlashCards(flashCards))
      })
      .catch(err => {
        dispatch(addMessage(err.toString(), "error"))
      })
    }else{
      dispatch(fetchedFlashCards([]))
    }
  }
}

const submit = (resource, info, options) => {
  return(dispatch, getState) => {
    let optionsObj = getOptions(resource, info, options)
    fetch(optionsObj.url, {
      method: optionsObj.method,
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(responseObj => {
      if(responseObj.error){
        dispatch(addMessage(responseObj.message, "error"))
      }else{
        dispatch(optionsObj.actionCreator(responseObj.resource))
        dispatch(addMessage(responseObj.message, "success"))
        options.callback()
      }
    })
    .catch(err => {
      dispatch(addMessage(err.toString(), "error"))
    })
  }
}

const logIn = (username, password) => {
  return (dispatch) => {
    fetch(`${URL}/login`, {
    	method: "POST",
    	headers: {
    		"Content-Type" : "application/json",
    		"Accept" : "application/json"
    	},
    	body: JSON.stringify({
    		username,
    		password
    	})
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        localStorage.setItem("token", data.token)
        dispatch(fetchedUser(data.user_data, data.categories, data.recent_flash_cards))
      }else{
        dispatch(addMessage(data.message, "error"))
      }
    })
    .catch(err => {
      dispatch(addMessage(err.toString(), "error"))
    })
  }
}

const fetchActiveCategory = (categoryId) => {
  return (dispatch, getState) => {
    let category = getState().categories.find(category => category.id === categoryId)
    if(!getState().activeCategory || getState().activeCategory.id !== categoryId){
      fetch(`${URL}/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setActiveCategory(category, data.flash_cards))
      })
      .catch(err => {
        dispatch(addMessage(err.toString(), "error"))
      })
    }else{
      dispatch(shuffleCategory(category))
    }
  }
}

const addMessage = (content, type) => {
  return (dispatch) => {
    let id = Date.now()
    let message = {id, content, type}
    dispatch({type: ACTIONTYPE.ADD_MESSAGE, message})
    setTimeout(()=>{dispatch(removeMessage(id))}, 3000)
  }
}

const removeMessage = (id) => ({type: ACTIONTYPE.REMOVE_MESSAGE, id})
const createCard = (flashCard) => ({type: ACTIONTYPE.CREATE_CARD, flashCard})
const updateCard = (flashCard) => ({type: ACTIONTYPE.UPDATE_CARD, flashCard})
const deleteCard = (flashCard) => ({type: ACTIONTYPE.DELETE_CARD, flashCard})
const logOut = () => ({type: ACTIONTYPE.LOGOUT})
const updateTracks = (album) => ({type: ACTIONTYPE.UPDATE_TRACKS, album})
const fetchedData = (albums) => ({type: ACTIONTYPE.FETCHED_DATA, albums})
const fetchedSongs = (songs) => ({type: ACTIONTYPE.FETCHED_SONGS, songs})
const fetchedUser = (user, categories, recentFlashCards) => ({
  type: ACTIONTYPE.FETCHED_USER, user, categories, recentFlashCards
})
const fetchedFlashCards = (flashCards) => ({type: ACTIONTYPE.FETCHED_FLASH_CARDS, flashCards})
const createAlbum = (album) => ({type: ACTIONTYPE.CREATE_ALBUM, album})
const updateAlbum = (album) => ({type: ACTIONTYPE.UPDATE_ALBUM, album})
const deleteAlbum = (album) => ({type: ACTIONTYPE.DELETE_ALBUM, album})
const createSong = (song) => ({type: ACTIONTYPE.CREATE_SONG, song})
const updateSong = (song) => ({type: ACTIONTYPE.UPDATE_SONG, song})
const deleteSong = (song) => ({type: ACTIONTYPE.DELETE_SONG, song})
const createCategory = (category) => ({type: ACTIONTYPE.CREATE_CATEGORY, category})
const updateCategory = (category) => ({type: ACTIONTYPE.UPDATE_CATEGORY, category})
const deleteCategory = (category) => ({type: ACTIONTYPE.DELETE_CATEGORY, category})
const setActiveCategory = (category, flashCards) => ({type: ACTIONTYPE.SET_ACTIVE_CATEGORY, category, flashCards})
const resetActiveCategory = () => ({type: ACTIONTYPE.RESET_ACTIVE_CATEGORY})
const shuffleCategory = (category) => ({type: ACTIONTYPE.SHUFFLE_CATEGORY, category})
const toggleLanguage = () => ({type: ACTIONTYPE.TOGGLE_LANGUAGE})
const sortCategories = (sortBy) => ({type: ACTIONTYPE.SORT_CATEGORIES, sortBy})
const sortFlashCards = (sortBy) => ({type: ACTIONTYPE.SORT_FLASH_CARDS, sortBy})
const resetFilter = () => ({type: ACTIONTYPE.RESET_FILTER})

export {fetchingData, submit, updateAlbum, createAlbum, fetchingFlashCards,
  createSong, deleteAlbum, updateSong, deleteSong, updateTracks, fetchingSongs,
  fetchingUser, logOut, logIn, createCategory, updateCategory, deleteCategory,
  createCard, deleteCard, updateCard, fetchActiveCategory, resetActiveCategory,
  toggleLanguage, sortCategories, sortFlashCards, resetFilter, addMessage,
  removeMessage }
