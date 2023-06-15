import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route'
import { getAccessToken, getAllTracksInPlaylist, getBulkAlbums, getBulkArtist, getCurrentUserPlaylist, getUniqueAlbumsFromTracks, getUniqueArtistsFromTracks } from '@/app/lib/spotify';
import { useSession } from 'next-auth/react';
import { generateKeySync } from 'crypto';

type PlaylistKey = { id: string, name: string }

export async function GET() {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }

    const accessToken = await getAccessToken(userSession.user!.refreshToken)

    let playlist_list = await getCurrentUserPlaylist(accessToken);
    playlist_list = playlist_list.filter((item) => item.owner.id === userSession.user!.id);

    const playlistMap = new Map<PlaylistKey, PlaylistTrackItem[]>();


    for (const playlist of playlist_list) {
        const tracksList: PlaylistTrackItem[] = [];
        tracksList.push(...(await getAllTracksInPlaylist(playlist.id, accessToken)))
        playlistMap.set({ id: playlist.id, name: playlist.name }, tracksList)
    }

    // Fetch all unique albums ahead of time in bulk, to avoid rate limits
    const uniqueArtist = getUniqueArtistsFromTracks(playlistMap); // <-
    const artists = await getBulkArtist(uniqueArtist, accessToken);

    const returnData: {playlist: PlaylistKey, genres: {genre:string, duration: number}[]}[] = [];
    playlistMap.forEach((playlistTrackList, playlistKey) => {
        const genreMap = new Map<string, number>()
        for (const playlistTrack of playlistTrackList) {
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


