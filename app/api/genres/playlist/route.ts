import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route'
import { getAccessToken, getAllTracksInPlaylist, getBulkAlbums, getCurrentUserPlaylist, getUniqueAlbumsFromTracks } from '@/app/lib/spotify';
import { useSession } from 'next-auth/react';
import { generateKeySync } from 'crypto';

export async function GET() {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }

    const accessToken = await getAccessToken(userSession.user.refreshToken)

    let playlist_list = await getCurrentUserPlaylist(accessToken);
    playlist_list = playlist_list.filter((item) => item.owner.id === userSession.user.id);

    // GenreMap will be used to reduce genres into the sum of each songs duration
    // Tracks alone do not have genres, so we need to fetch all albums
    const genreMap = new Map();
    const tracksList = [];

    for (let i = 0; i < playlist_list.length; i++) {
        const playlist = playlist_list[i];
        tracksList.push(...(await getAllTracksInPlaylist(playlist.id, accessToken)))
    }

    // Fetch all unique albums ahead of time in bulk, to avoid rate limits
    const uniqueAlbums = getUniqueAlbumsFromTracks(tracksList);
    const albums = await getBulkAlbums(uniqueAlbums, accessToken);

    for (const track of tracksList) {
        // Genres can be uncategorized (empty arrays) label them as Uncategorized
        let album = albums.get(track.track.album.id)
        let genre_list;

        if (!album || album.genres.length === 0) {
            genre_list = ["uncategorized"]
        } else {
            genre_list = album.genres
        }

        for (const genre of genre_list) {
            if (genreMap.has(genre)) {
                genreMap.set(genre, genreMap.get(genre) + Math.floor(track.track.duration_ms / 1000))
            } else {
                genreMap.set(genre, Math.floor(track.track.duration_ms / 1000))
            }
        }

    }

    const return_data: { genre: string, duration: number }[] = []
    genreMap.forEach((duration, genre,) => return_data.push({ genre, duration }));
    return_data.sort((a, b) => a.duration - b.duration)

    return NextResponse.json(return_data)
}


