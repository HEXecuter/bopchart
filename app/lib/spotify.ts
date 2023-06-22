import axios from "axios";

const BASIC_TOKEN = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const CURRENT_PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists'
const BULK_ALBUM_ENDPOINT = 'https://api.spotify.com/v1/albums'
const BULK_ARTIST_ENDPOINT = 'https://api.spotify.com/v1/artists'

export async function getAccessToken(accessToken: string) {
    const data = {
        grant_type: 'refresh_token',
        refresh_token: accessToken,
        client_id: process.env.SPOTIFY_CLIENT_ID
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${BASIC_TOKEN}`
    }

    const response = await axios.post(TOKEN_ENDPOINT, data, { headers: headers })

    if (response.status === 200) {
        return response.data.access_token as string;
    } else {
        return null;
    }
}

export async function getCurrentUserPlaylist(bearerToken: string) {
    const params = {
        limit: 50,
        offset: 0
    }

    const headers = { Authorization: `Bearer ${bearerToken}` }

    let response = await axios.get(CURRENT_PLAYLIST_ENDPOINT, { headers: headers, params: params })

    let playlist_list: PlaylistItem[] = []
    playlist_list.push(...response.data.items)

    while (response.data.next) {
        response = await axios.get(response.data.next, { headers: headers })
        playlist_list.push(...response.data.items)
    }

    return playlist_list
}

export async function getPlaylist(playlistId: string, bearerToken: string) {
    const headers = { Authorization: `Bearer ${bearerToken}` }
    const response = await axios.get(PLAYLIST_ENDPOINT + '/' + playlistId, {headers: headers})
    return response.data as PlaylistItem
}

export async function getAllTracksInPlaylist(playlistId: string, bearerToken: string) {
    const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const headers = { Authorization: `Bearer ${bearerToken}` }

    let response = await axios.get(playlistUrl, { headers: headers })

    let tracks_list: PlaylistTrackItem[] = []
    tracks_list.push(...response.data.items)

    while (response.data.next) {
        response = await axios.get(response.data.next, { headers: headers })
        tracks_list.push(...response.data.items)
    }

    return tracks_list;
}

export function getUniqueAlbumsFromTracks(trackList: PlaylistTrackItem[]): string[] {
    const albumIds = new Set<string>();
    for (const track of trackList) {
        if(!track.track) continue;
        albumIds.add(track.track.album.id)
    }

    return [...albumIds];
}

export function getUniqueArtistsFromTracks(trackMap: Map<any, PlaylistTrackItem[]>): string[] {
    const artistIds = new Set<string>();
    trackMap.forEach((value, key) => {
        value.forEach((track) => {
            if(!track.track) return;

            track.track.artists.forEach((artist) => {
                artistIds.add(artist.id)
            })
        })
    })

    return [...artistIds];
}

export async function getBulkAlbums(albumList: string[], bearerToken: string) {
    const headers = { Authorization: `Bearer ${bearerToken}` }
    let currentBatch = []
    const albums = new Map<string, FullAlbum>()

    for (const id of albumList) {
        currentBatch.push(id);
        if (currentBatch.length == 20 || id == albumList.at(-1)) {
            const response = await axios.get(BULK_ALBUM_ENDPOINT, { headers, params: { ids: currentBatch.join(',') } })
            currentBatch = []
            response.data.albums.forEach((album: FullAlbum) => {
                if (album) {
                    albums.set(album.id, album)
                }
            })
        }
    }

    return albums;
}

export async function getBulkArtist(artistList: string[], bearerToken: string) {
    const headers = { Authorization: `Bearer ${bearerToken}` }
    let currentBatch = []
    const artists = new Map<string, FullArtist>()

    for (const id of artistList) {
        currentBatch.push(id);
        if (currentBatch.length === 50 || id == artistList.at(-1)) {
            const response = await axios.get(BULK_ARTIST_ENDPOINT, { headers, params: { ids: currentBatch.join(',') } })
            currentBatch = []
            response.data.artists.forEach((artist: FullArtist) => {
                if (artist) {
                    artists.set(artist.id, artist)
                }
            })
        }
    }

    return artists;
}

function getSpotifyImage(playlist: PlaylistItem) {
    

}