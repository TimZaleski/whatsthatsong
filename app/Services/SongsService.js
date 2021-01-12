import { ProxyState } from "../AppState.js"
import Playlist from "../Models/Playlist.js";
import Song from "../Models/Song.js"
import {api} from "./AxiosService.js"

class SongsService {
 
 async getSongs(playlistID, token) {
    let res  = await api.get("playlists/" + playlistID, {headers:{Authorization : "Bearer " + token}})
    let filteredData = res.data.tracks.items.filter(i=> i.track.preview_url != null);
    let noPreviewSongs = res.data.tracks.items.filter(i=> i.track.preview_url == null);
    
    ProxyState.songs = this.shuffleArray(filteredData).map(c=> new Song(c));
    ProxyState.noPreview = noPreviewSongs.map(c=> new Song(c));
    let playerHighScore = 0;
    let playerPlaylist = ProxyState.player.playlists ? ProxyState.player.playlists.find(x => x.id === playlistID) : null;
    
    if (playerPlaylist)
    {
      playerHighScore = playerPlaylist.highScore;
    }
    ProxyState.currentPlaylist = new Playlist(playlistID, playerHighScore, (ProxyState.songs.length * 2), 0);

  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
        return array;
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