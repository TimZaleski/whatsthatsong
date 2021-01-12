import { ProxyState } from "../AppState.js"
import { songsService } from "../Services/SongsService.js"

let i = 0;
let fcd = 4;

function _drawSongs() {
  if (ProxyState.songs.length < 20)
  {
    document.getElementById('notifications').innerHTML = `<h2>Playlist ${ProxyState.currentPlaylist.id} has fewer than 20 songs with previews.</h2>`;
  }
  else
  {
    fcd = 4;
    var countDownTimer = setInterval(function(){
      firstTimer(countDownTimer);
      }, 1000);
  
    setTimeout(function() { 
      gameTimer();
      var timer = setInterval(function(){
        gameTimer(timer);
    }, 35000);
     }, 5000);
  }
}

function gameTimer(timer){
  if (i < ProxyState.songs.length && i < 20)
  {
    setTimeout(function() { 
      fcd = 4;
      var countDownTimer = setInterval(function(){
      firstTimer(countDownTimer);
      }, 1000);
      }, 30000);

    let audio = new Audio(ProxyState.songs[i].previewURL);
    audio.loop = false;
    audio.play(); 
    ProxyState.currentSong = ProxyState.songs[i];
    i++;

  }
  else
  {
    i = 0;
    clearInterval(timer);
  }
}

function firstTimer(countDownTimer)
{
  if (fcd === 0)
  {
    clearInterval(countDownTimer);
    // @ts-ignore
    document.getElementById("answerBtn").disabled = false;
    document.getElementById('notifications').innerHTML = `<h2>Guess the Song Name and Artist!</h2>`;
  }
  if(fcd <= 5 && fcd > 0)
  {
    document.getElementById('notifications').innerHTML = `<h2>${fcd.toString()}</h2>`;
    fcd--;
  }
}

export default class SongsController {
  constructor(token) {
    this.token = token;
    ProxyState.on("songs", _drawSongs);
  }

  loadPlaylist(){
    window.event.preventDefault();
    let form = window.event.target;
    try {
      // @ts-ignore
      document.getElementById("playlistBtn").disabled = true;
      songsService.getSongs(form['playlistID'].value, this.token);
    } catch (error) {
      console.error(error)
    }
  }
  
}