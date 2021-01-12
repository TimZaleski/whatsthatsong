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
    let ret = "";
    let ldSong = this.levenshteinDistance(songToCheck, songName);
    let ldArtist = this.levenshteinDistance(artistToCheck, artistName);
    let songLength = songName.length;
    let artistLength = artistName.length;
    let songCorrect = false;
    let artistCorrect = false;

      songCorrect = this.validate(songLength, ldSong)
      artistCorrect = this.validate(artistLength, ldArtist)

      if (songCorrect)
      {
        ret+= "Song right ";
        playlist.currentScore++;
      }

      if (artistCorrect)
      {
        ret+= "Artist right ";
        playlist.currentScore++;
      }
      console.log(ret);
      if (playlist.highScore > playlist.maxScore)
      {
        playlist.highScore = playlist.maxScore;
      }
  }

  validate(length, ld) {
    let correct = false;
    if (length < 6) {
      if (ld <= 1) {
        correct = true;
      }
    }
    else if (length >= 6 && length < 11) {
      if (ld <= 2) {
        correct = true;
      }
    }
    else if (length >= 11 && length < 15) {
      if (ld <= 3) {
        correct = true;
      }
    }
    else if (length >= 15 && length < 21) {
      if (ld <= 4) {
        correct = true;
      }
    }
    else if (length >= 21 && length < 26) {
      if (ld <= 5) {
        correct = true;
      }
    }
    return correct;
  }

  levenshteinDistance (a, b)
  {
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
        } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                            matrix[i-1][j] + 1)); // deletion
        }
        }
    }
    console.log(matrix[b.length][a.length]);
  return matrix[b.length][a.length];
  }
}

export const playerService = new PlayerService()