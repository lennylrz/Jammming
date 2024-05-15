import React, { useState } from 'react'
import styles from './App.module.css'
import SearchResults from '../SearchResults/SearchResults'
function App() {
  const [searchResults, setSearchResults] = useState([{
    name: 'example track name 1',
    artist: 'example track artist 1',
    album: 'example track album 1',
    id: 1
  }, {
    name: 'example track name 2',
    artist: 'example track artist 2',
    album: 'example track album 2',
    id: 2
  }])
  return (
    <div>
      <h1>Jammming</h1>
      <div className="App">
          <SearchBar />
        <div className='App-playlist'>
          <SearchResults userSearchResult={searchResults}/>
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
