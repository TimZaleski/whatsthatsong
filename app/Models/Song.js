

export default class Song {
  constructor( data ) {
    this.name = data.track.name;
    this.previewURL = data.track.preview_url;
    this.artists = data.track.artists[0].name;
  }

}