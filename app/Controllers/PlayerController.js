import { ProxyState } from "../AppState.js"
import { playerService } from "../Services/PlayerService.js"

function _drawPlayer() {
  console.log(ProxyState.player);
}

export default class PlayerController {
  constructor() {
    ProxyState.on("player", _drawPlayer);
    this.loadCurrentPlayer();
    if (ProxyState.player === null)
    {
      // @ts-ignore
    $("#new-player-modal").modal('show');
    }
  }

  createPlayer() {
    window.event.preventDefault();
    let form = window.event.target
    let newPlayer = {
      name: form['name'].value
    }
    try {
      playerService.createPlayer(newPlayer)
      
    } catch (error) {
      console.error(error)
    }
    // @ts-ignore
    form.reset()
    // @ts-ignore
    $("#new-player-modal").modal('hide');
  }

  loadCurrentPlayer(){
    playerService.loadPlayer();
  }

  checkAnswer(){
    window.event.preventDefault();
    let form = window.event.target;
    try {
      let songToCheck = form['songName'].value.toLowerCase();
      let artistToCheck = form['artistName'].value.toLowerCase();
      playerService.checkAnswer(songToCheck, artistToCheck);
      playerService.savePlayer();
      // @ts-ignore
      form.reset();
    } catch (error) {
      console.error(error)
    }
  }
}