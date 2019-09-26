import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "playlist 1",
      playlistTrack: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTrack.find(element => element.id === track.id)) return;
    this.setState({
      playlistTrack: [...this.state.playlistTrack, track]
    });
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTrack.filter(oldTrack => oldTrack.id !== track.id);
    this.setState({
      playlistTrack: newPlaylist
    })
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    })
  }

  savePlaylist() {
    const tracksURIs = this.state.playlistTrack.map(track => track.uri);
    console.log(tracksURIs);
  }

  search(term) {
    console.log(Spotify.search(term));
    Spotify.search(term).then(searchResults => this.setState({searchResults}));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTrack={this.state.playlistTrack} onRemove={this.removeTrack} updatePlaylistName={this.updatePlaylistName} playlistName={this.state.playlistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
