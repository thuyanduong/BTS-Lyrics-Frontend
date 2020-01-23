import URL from '../_helpers/url'
import ACTIONTYPE from './actions'
import getOptions from '../_helpers/optionsGenerator'

const fetchingUser = () => {
  return (dispatch) => {
    let token = localStorage.getItem('token')
    if(token){
      fetch('http://localhost:3000/user', {
        headers: {"Authentication": `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchedUser(data.user_data, data.categories, data.recent_flash_cards))
      }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
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
        alert(responseObj.message)
      }else{
        dispatch(optionsObj.actionCreator(responseObj.resource))
        window.alert(responseObj.message)
        options.callback()
      }
    })
    .catch(err => {
      alert("ERROR! " + err)
    })
  }
}

const logIn = (username, password) => {
  return (dispatch) => {
    fetch('http://localhost:3000/login', {
    	method: "POST",
    	headers: {
    		"Content-Type" : "application/json",
    		"Accept" : "application/json"
    	},
    	body: JSON.stringify({
    		username,
    		password
    	})
    }).then(res => res.json())
    .then(data => {
      if(data.success){
        localStorage.setItem("token", data.token)
        dispatch(fetchedUser(data.user_data, data.categories, data.recent_flash_cards))
      }else{
        alert(data.message)
      }
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
    }else{
      //just shuffle the flashCards in the activeCategory
      dispatch(shuffleCategory(category))
    }
  }
}

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

export {fetchingData, submit, updateAlbum, createAlbum, fetchingFlashCards,
  createSong, deleteAlbum, updateSong, deleteSong, updateTracks, fetchingSongs,
  fetchingUser, logOut, logIn, createCategory, updateCategory, deleteCategory,
  createCard, deleteCard, updateCard, fetchActiveCategory, resetActiveCategory}
