import { ProxyState } from "../AppState.js"
import Song from "../Models/Song.js"
import {api} from "./AxiosService.js"

class SongsService {
 
 async getSongs(playlistID) {
    let res  = await api.get("playlists/" + playlistID)
    console.log(res.data)
    ProxyState.songs = res.data.tracks.items.map(c=> new Song(c))
  }

}

//GET
//URL/api/collection

//GETBYID
//URL/api/collection/someId

//PUT
//URL/api/collection/someId, whatWeAreEditing

//POST
//URL/api/collection , whatWeArePosting

//DELETE
//URL/api/collection/someId
//api.delete(id)



// Singleton Pattern
export const songsService = new SongsService()