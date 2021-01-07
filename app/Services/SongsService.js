import { ProxyState } from "../AppState.js"
import Song from "../Models/Song.js"
import {api} from "./AxiosService.js"

class SongsService {
 
 async getSongs(playlistID, token) {
    let res  = await api.get("playlists/" + playlistID, {headers:{Authorization : "Bearer " + token}})
    console.log(res.data);
    let filteredData = res.data.tracks.items.filter(i=> i.track.preview_url != null);
    let noPreviewSongs = res.data.tracks.items.filter(i=> i.track.preview_url == null);
    console.log(filteredData);
    ProxyState.songs = filteredData.map(c=> new Song(c));
    ProxyState.noPreview = noPreviewSongs.map(c=> new Song(c));
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