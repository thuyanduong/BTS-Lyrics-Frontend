import URL from './url'
import {addAlbum, updateAlbum, deleteAlbum, addSong, updateSong, deleteSong} from '../redux/actionCreators'

export default (resource, info, options) => {
  let obj = {method: options.method}
  switch(options.method){
    case "POST":
      obj.url = `${URL}/${resource}s`
      obj.actionCreator = resource === "album" ? addAlbum : addSong
      break;
    case "PATCH":
      obj.url = `${URL}/${resource}s/${info.id}`
      obj.actionCreator = resource === "album" ? updateAlbum : updateSong
      break;
    case "DELETE":
      obj.url = `${URL}/${resource}s/${info.id}`
      obj.actionCreator = resource === "album" ? deleteAlbum : deleteSong
      break;
    default:
  }
  return obj
}
