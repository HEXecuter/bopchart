import { data } from "autoprefixer";
import axios from "axios";

const BASIC_TOKEN = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const CURRENT_PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'

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
        return response.data.access_token;
    } else {
        return null;
    }
}

export async function getCurrentUserPlaylist(bearerToken: string) {
    const params = {
        limit: 10,
        offset: 0
    }

    const headers = { Authorization: `Bearer ${bearerToken}` }

    let response = await axios.get(CURRENT_PLAYLIST_ENDPOINT, { headers: headers, params: params })

    let playlist_list: PlaylistItem[] = []
    playlist_list = playlist_list.concat(response.data.items)

    while (response.data.next) {
        response = await axios.get(response.data.next, { headers: headers })
        playlist_list.push(...response.data.items)
    }
    
    return playlist_list
}