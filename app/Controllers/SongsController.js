import { ProxyState } from "../AppState.js"
import { songsService } from "../Services/SongsService.js"

function _drawSongs() {
  let songs = ProxyState.songs;
 // let template = ''
  songs.forEach(song => {
    // NOTE Getters FAKE properties as methods
   console.log(song);
  })
  //document.getElementById('cars').innerHTML = template
}


export default class SongsController {
  constructor() {
    ProxyState.on("songs", _drawSongs);
  }

  loadPlaylist(){
    window.event.preventDefault();
    let form = window.event.target;
    try {
      songsService.getSongs(form['playlistID'].value);
    } catch (error) {
      console.error(error)
    }
  }
}