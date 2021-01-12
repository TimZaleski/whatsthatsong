import { ProxyState } from "../AppState.js";
import Player from "../Models/Player.js";


export function savePlayer(){
  if (ProxyState.currentPlaylist.currentScore > ProxyState.currentPlaylist.highScore)
  {
    ProxyState.currentPlaylist.highScore = ProxyState.currentPlaylist.currentScore;
  }
  let playerPlaylist = ProxyState.player.playlists ? ProxyState.player.playlists.find(x => x.id === ProxyState.currentPlaylist.id) : null;
  if (playerPlaylist)
  {
    ProxyState.player.playlists = ProxyState.player.playlists.filter(s => s.id !== ProxyState.currentPlaylist.id)
    ProxyState.player.playlists = [...ProxyState.player.playlists, ProxyState.currentPlaylist]
    console.log(ProxyState.player.playlists);
  }
  else
  {
    ProxyState.player.playlists.push(ProxyState.currentPlaylist);
    console.log(ProxyState.player.playlists);
  }
  localStorage.setItem("playerData", JSON.stringify({player: ProxyState.player}))
}

export function loadPlayer(){
  let data = JSON.parse(localStorage.getItem("playerData"))
  if(data){
    console.log(data);
   ProxyState.player = new Player(data.player.name, data.player.playlists);
  }

}