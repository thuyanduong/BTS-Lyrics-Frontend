import URL from '../_helpers/url'
import {FETCHED_RESULTS, FETCHED_DATA, ADD_SONG, ADD_ALBUM, LOADING_SEARCH_RESULTS,
LOADING, UPDATE_ALBUM, DELETE_ALBUM, UPDATE_SONG, DELETE_SONG} from './actions'
import getOptions from '../_helpers/optionsGenerator'

const fetchingResults = (query) => {
  return (dispatch) => {
    dispatch(loadingSearchResults())
    fetch(`${URL}/search${query}`)
    .then(res => res.json())
    .then(data => {
      dispatch(fetchedResults(data))
    })
  }
}

const fetchingData = () => {
  return (dispatch) => {
    dispatch(loading())
    fetch(`${URL}/bts`)
    .then(res => res.json())
    .then(albums => {
      dispatch(fetchedData(albums))
    })
  }
}

const submit = (resource, info, options) => {
  return(dispatch) => {
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

const fetchedResults = (results) => ({type: FETCHED_RESULTS, results})
const fetchedData = (albums) => ({type: FETCHED_DATA, albums})
const loading = () => ({type: LOADING})
const loadingSearchResults = () => ({type: LOADING_SEARCH_RESULTS})
const addAlbum = (album) => ({type: ADD_ALBUM, album})
const updateAlbum = (album) => ({type: UPDATE_ALBUM, album})
const deleteAlbum = (album) => ({type: DELETE_ALBUM, album})
const addSong = (song) => ({type: ADD_SONG, song})
const updateSong = (song) => ({type: UPDATE_SONG, song})
const deleteSong = (song) => ({type: DELETE_SONG, song})

export {fetchingResults, fetchingData, submit, addAlbum, updateAlbum,
  deleteAlbum, addSong, updateSong, deleteSong}
