import { ProxyState } from "../AppState.js"
import Player from "../Models/Player.js"
import {api} from "./AxiosService.js"
import {savePlayer} from "../Utils/LocalStorage.js"
import {loadPlayer} from "../Utils/LocalStorage.js"

class PlayerService {
 
 loadPlayer() {
    loadPlayer();
  }

  createPlayer(newPlayer) {

     ProxyState.player = newPlayer;
     savePlayer();
  }

  savePlayer()
  {
    savePlayer();
  }


  deletePlayer(id) {
    /* let res  = await api.delete("cars/"+id)
    console.log(res)

    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)

    // this.getCars() */

  }

  checkAnswer(songToCheck, artistToCheck)
  {
    let songName = ProxyState.currentSong.name.toLowerCase();
    let artistName = ProxyState.currentSong.artists.toLowerCase();
    let playlist = ProxyState.currentPlaylist;
    let ret = ""
      if (songToCheck === songName)
      {
        ret+= "Song right ";
        playlist.currentScore++;
      }

      if (artistToCheck === artistName)
      {
        ret+= "Artist right ";
        playlist.currentScore++;
      }

      if (playlist.highScore > playlist.maxScore)
      {
        playlist.highScore = playlist.maxScore;
      }
      console.log(ret);
  }

}

export const playerService = new PlayerService()