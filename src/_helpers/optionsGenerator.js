import URL from './url'
import {createAlbum, updateAlbum, deleteAlbum, createSong, updateSong,
  deleteSong, updateTracks, createCategory, updateCategory,
  deleteCategory, createCard, deleteCard, updateCard} from '../redux/actionCreators'

const pluralize = (word) => {
  switch (word) {
    case "album":
      return "albums"
    case "song":
      return "songs"
    case "category":
      return "categories"
    case "card":
      return "cards"
    default:
      return ""
  }
}

export default (resource, info, options) => {
  let obj = {method: options.method}
  switch(options.method){
    case "POST":
      obj.url = `${URL}/${pluralize(resource)}`
      switch (resource) {
        case "album":
          obj.actionCreator = createAlbum
          break;
        case "song":
          obj.actionCreator = createSong
          break;
        case "category":
          obj.actionCreator = createCategory
          break;
        case "card":
          obj.actionCreator = createCard
          break;
        default:
          return ""
      }
      break;
    case "PATCH":
      obj.url = `${URL}/${pluralize(resource)}/${info.id}`
      switch (resource) {
        case "album":
          obj.actionCreator = updateAlbum
          break;
        case "song":
          obj.actionCreator = updateSong
          break;
        case "category":
          obj.actionCreator = updateCategory
          break;
        case "card":
          obj.actionCreator = updateCard
          break;
        default:
          return ""
      }
      break;
    case "DELETE":
      obj.url = `${URL}/${pluralize(resource)}/${info.id}`
      switch (resource) {
        case "album":
          obj.actionCreator = deleteAlbum
          break;
        case "song":
          obj.actionCreator = deleteSong
          break;
        case "category":
          obj.actionCreator = deleteCategory
          break;
        case "card":
          obj.actionCreator = deleteCard
          break;
        default:
          return ""
      }
      break;
    case "PUT":
      obj.url = `${URL}/${resource}`
      obj.actionCreator = updateTracks
      break;
    default:
  }
  return obj
}
