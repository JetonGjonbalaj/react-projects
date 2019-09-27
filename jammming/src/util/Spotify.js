const clientId = '';
const redirectUrl = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = expiresInMatch[1];
            setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    },

    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {'Authorization': `Bearer ${accessToken}`  }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            })
        })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) return;
        
        const accessToken = this.getAccessToken();
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        }
        let userID;
        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                let playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                });
            })
        });
    }
}

export default Spotify