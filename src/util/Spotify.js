let accessToken;

const clientId = '29d7417066d345f197f705751013bf35';
const redirectURL = 'http://localhost:3000/';

const Spotify = {
  async getAccessToken() {
    const tokenInStorage = localStorage.getItem('accessToken');
    if (tokenInStorage) {
      accessToken = tokenInStorage;
      return accessToken;
    } else {
      const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
      const expiryTime = window.location.href.match(/expires_in=([^&]*)/);
      if (tokenInURL && expiryTime) {
        accessToken = tokenInURL[1];
        localStorage.setItem('accessToken', accessToken);
        const expiresIn = Number(expiryTime[1]);
        setTimeout(() => localStorage.removeItem('accessToken'), expiresIn * 1000);
        window.history.pushState('Access token', null, '/');
        return accessToken;
      } else {
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location = redirect;
      }
    }
  },

  async search(term) {
    try {
      accessToken = await Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!response.ok) {
        throw new Error('Request failed: ' + response.status);
      }
      const jsonResponse = await response.json();
      if (!jsonResponse) {
        console.error('Response Error');
        return [];
      }
      return jsonResponse.tracks.items.map(t => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri
      }));
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  },
  savePlaylist(name, TrackUris) {
    if (!name || !TrackUris) {
        return
    }
    const aToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` }
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {headers: header})
    .then((response) => response.json())
    .then((jsonResponse) => {
        userId = jsonResponse.id
        let playlistId;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: header,
            method: 'post',
            body: JSON.stringify({name: name})
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: header,
                method: 'post',
                body: JSON.stringify({uris: TrackUris})
            })
        })
    })
  } 
};

export { Spotify };