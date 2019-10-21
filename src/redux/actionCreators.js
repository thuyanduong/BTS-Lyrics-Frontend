import URL from '../_helpers/url'
import {FETCHED_RESULTS, FETCHED_DATA, CREATE_SONG, CREATE_ALBUM,
  LOADING_SEARCH_RESULTS, LOADING_DATA, UPDATE_ALBUM, DELETE_ALBUM, UPDATE_SONG,
  DELETE_SONG, UPDATE_TRACKS, LOADING_SONGS, FETCHED_SONGS} from './actions'
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
    dispatch(loadingData())
    fetch(`${URL}/bts`)
    .then(res => res.json())
    .then(albums => {
      dispatch(fetchedData(albums))
    })
  }
}

const fetchingSongs = () => {
  return (dispatch) => {
    dispatch(loadingSongs())
    fetch(`${URL}/songs`)
    .then(res => res.json())
    .then(songs => {
      dispatch(fetchedSongs(songs))
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

const updateTracks = (album) => ({type: UPDATE_TRACKS, album})
const fetchedResults = (results) => ({type: FETCHED_RESULTS, results})
const fetchedData = (albums) => ({type: FETCHED_DATA, albums})
const fetchedSongs = (songs) => ({type: FETCHED_SONGS, songs})
const loadingData = () => ({type: LOADING_DATA})
const loadingSongs = () => ({type: LOADING_SONGS})
const loadingSearchResults = () => ({type: LOADING_SEARCH_RESULTS})
const createAlbum = (album) => ({type: CREATE_ALBUM, album})
const updateAlbum = (album) => ({type: UPDATE_ALBUM, album})
const deleteAlbum = (album) => ({type: DELETE_ALBUM, album})
const createSong = (song) => ({type: CREATE_SONG, song})
const updateSong = (song) => ({type: UPDATE_SONG, song})
const deleteSong = (song) => ({type: DELETE_SONG, song})

export {fetchingResults, fetchingData, submit, updateAlbum, createAlbum, createSong,
  deleteAlbum, updateSong, deleteSong, updateTracks, fetchingSongs}
