import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route'
import { getAllTracksInPlaylist, getBulkAlbums, getCurrentUserPlaylist, getUniqueAlbumsFromTracks } from '@/app/lib/spotify';
import { useSession } from 'next-auth/react';
import { generateKeySync } from 'crypto';

export async function GET() {
    const userSession = await getServerSession(authOptions);

    console.log(userSession, '******************')
    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }
    
    let playlist_list = await getCurrentUserPlaylist(userSession.user.accessToken);
    playlist_list = playlist_list.filter((item) => item.owner.id === userSession.user.id);

    // console.log(playlist_list, "Playlist =============\n", '\n\n')
    // GenreMap will be used to reduce genres into the sum of each songs duration
    // Tracks alone do not have genres, so we need to fetch all albums
    const genreMap = new Map();
    const tracksList = [];

    // TODO: Change back to playlist_list.length
    for (let i = 0; i < 1; i++) {
        const playlist = playlist_list[i];
        tracksList.push(...(await getAllTracksInPlaylist(playlist.id, userSession.user.accessToken)))
    }

    // console.log(tracksList, "tracksList =============\n", '\n\n')

    // Fetch all unique albums ahead of time in bulk, to avoid rate limits
    const uniqueAlbums = getUniqueAlbumsFromTracks(tracksList);
    // console.log(uniqueAlbums, "UniqueAlbums =============\n", '\n\n')
    const albums = await getBulkAlbums(uniqueAlbums, userSession.user.accessToken);

    // console.log(albums, "albums =============\n", '\n\n')
    for (const track of tracksList) {
        // Genres can be uncategorized (empty arrays) label them as Uncategorized
        for (const genre of (albums.get(track.track.album.id)!.genres && ["Uncategorized"])) {
            if (genreMap.has(genre)) {
                genreMap.set(genre, genreMap.get(genre) + Math.floor(track.track.duration_ms / 1000))
            } else {
                genreMap.set(genre, Math.floor(track.track.duration_ms / 1000))
            }
        }
    }

    // console.log(genreMap, "GenreMap =============\n", '\n\n')

    const return_data: { genre: string, duration: number }[] = []
    genreMap.forEach((duration, genre,) => return_data.push({ genre, duration }));
    return_data.sort((a, b) => a.duration - b.duration)

    // console.log(return_data, "Return Data =============\n", '\n\n')

    return NextResponse.json(return_data)
}


