import URL from './url'
import {createAlbum, updateAlbum, deleteAlbum, createSong, updateSong,
  deleteSong, updateTracks} from '../redux/actionCreators'

export default (resource, info, options) => {
  let obj = {method: options.method}
  switch(options.method){
    case "POST":
      obj.url = `${URL}/${resource}s`
      obj.actionCreator = resource === "album" ? createAlbum : createSong
      break;
    case "PATCH":
      obj.url = `${URL}/${resource}s/${info.id}`
      obj.actionCreator = resource === "album" ? updateAlbum : updateSong
      break;
    case "DELETE":
      obj.url = `${URL}/${resource}s/${info.id}`
      obj.actionCreator = resource === "album" ? deleteAlbum : deleteSong
      break;
    case "PUT":
      obj.url = `${URL}/${resource}`
      obj.actionCreator = updateTracks
      break;
    default:
  }
  return obj
}
