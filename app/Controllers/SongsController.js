import { ProxyState } from "../AppState.js"
import { songsService } from "../Services/SongsService.js"

let i = 0;
let cd = 35;
let fcd = 5;
function _drawSongs() {
  let songs = ProxyState.songs;
 // let template = ''
  songs.forEach(song => {
    // NOTE Getters FAKE properties as methods
   console.log(song);
  })
//   var countDownTimer = setInterval(function(){
      
//     firstTimer(countDownTimer);
// }, 1000);

// setTimeout(function() { 
//   var countDownTimer = setInterval(function(){
    
//     cdTimer(countDownTimer);
// }, 1000);
// }, 5000);

  setTimeout(function() { 
    gameTimer();
    var timer = setInterval(function(){
      gameTimer(timer);
  }, 35000);
   }, 5000);
  
}

function gameTimer(timer){
  if (i < ProxyState.songs.length)
  {
console.log(ProxyState.songs[i].previewURL);
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

function cdTimer(countDownTimer)
{
  if (cd === 0)
  {
    cd = 35;
    document.getElementById('notifications').innerHTML = `<h2>Guess the Song Name and Artist!</h2>`;
  }
  if(cd <= 5 && cd > 0)
  {
    document.getElementById('notifications').innerHTML = `<h2>${cd.toString()}</h2>`;
    cd--;
  }
  if(cd > 5)
  {
    cd--;
  }
}

function firstTimer(countDownTimer)
{
  if (fcd === 0)
  {
    clearInterval(countDownTimer);
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