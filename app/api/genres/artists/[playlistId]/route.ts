import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { getAccessToken, getAllTracksInPlaylist, getBulkAlbums, getBulkArtist, getCurrentUserPlaylist, getPlaylist, getUniqueAlbumsFromTracks, getUniqueArtistsFromTracks } from '@/app/lib/spotify';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type PlaylistKey = { id: string, name: string }
type GenreEntry = { genre: string, duration: number }

export async function GET(request: Request, { params }: { params: { playlistId: string } }) {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }

    const accessToken = await getAccessToken(userSession.user!.refreshToken)

    let playlist = await getPlaylist(params.playlistId, accessToken)
    const playlistMap = new Map<PlaylistKey, PlaylistTrackItem[]>();

    const tracksList: PlaylistTrackItem[] = [];
    tracksList.push(...(await getAllTracksInPlaylist(playlist.id, accessToken)))
    playlistMap.set({ id: playlist.id, name: playlist.name }, tracksList)

    // Fetch all unique artist ahead of time in bulk, and perform searches against this map to avoid rate limits
    const uniqueArtist = getUniqueArtistsFromTracks(playlistMap);
    const artists = await getBulkArtist(uniqueArtist, accessToken);

    const returnData: { playlist: PlaylistKey, genres: GenreEntry[] }[] = [];
    playlistMap.forEach((playlistTrackList, playlistKey) => {
        const genreMap = new Map<string, number>()
        for (const playlistTrack of playlistTrackList) {
            if (!playlistTrack.track) continue;
            for (const artistObj of playlistTrack.track.artists) {
                let artist = artists.get(artistObj.id)
                let genre_list

                if (!artist || artist.genres.length === 0) {
                    genre_list = ['Uncategorized']
                } else {
                    genre_list = artist.genres
                }

                for (const genre of genre_list) {
                    if (genreMap.has(genre)) {
                        genreMap.set(genre, genreMap.get(genre)! + Math.floor(playlistTrack.track.duration_ms / 1000))
                    } else {
                        genreMap.set(genre, Math.floor(playlistTrack.track.duration_ms / 1000))
                    }
                }
            }
        }
        const genre_list: { genre: string, duration: number }[] = []
        genreMap.forEach((duration, genre) => genre_list.push({ genre, duration }))
        genre_list.sort((a, b) => b.duration - a.duration)
        returnData.push({ playlist: playlistKey, genres: genre_list })
    })
    return NextResponse.json(returnData)
}


