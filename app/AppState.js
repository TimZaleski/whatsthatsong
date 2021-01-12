import Song from "./Models/Song.js"
import Playlist from "./Models/Playlist.js"
import Player from "./Models/Player.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Song[]} */
  songs = []
  noPreview = []
  /** @type {Song} */
  currentSong = null
  /** @type {Playlist} */
  currentPlaylist = null
  /** @type {Player} */
  player = null
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
