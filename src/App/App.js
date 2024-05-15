import React from 'react'
function App() {
  return (
    <div>
      <h1>Jammming</h1>
      <div className="App">
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
