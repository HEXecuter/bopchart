import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { getAccessToken, getAllTracksInPlaylist, getBulkAlbums, getBulkArtist, getCurrentUserPlaylist, getPlaylist, getUniqueAlbumsFromTracks, getUniqueArtistsFromTracks } from '@/app/lib/spotify';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


type PlaylistKey = { id: string, name: string }
type PopularityEntry = { song_popularity: number, artist_popularity: number, duration: number }

export async function GET(request: Request, { params }: { params: { playlistId: string } }) {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }

    const accessToken = await getAccessToken(userSession.user!.refreshToken);
    let playlist = await getPlaylist(params.playlistId, accessToken);

    const tracksList: PlaylistTrackItem[] = [];
    tracksList.push(...(await getAllTracksInPlaylist(playlist.id, accessToken)));

    const uniqueArtist = getUniqueArtistsFromTracks(tracksList);
    const artists = await getBulkArtist(uniqueArtist, accessToken);

    const popularityData: PopularityEntry[] = []

    let popularitySum = 0

    tracksList.forEach((item) => {
        if (item.track) {
            const firstArtist = artists.get(item.track!.artists[0].id)
            if (!firstArtist) return;

            popularityData.push({
                song_popularity: item.track.popularity,
                artist_popularity: firstArtist.popularity,
                duration: Math.floor(item.track!.duration_ms / 1000)
            })

            popularitySum += item.track.popularity
        }
    })

    const returnData: { playlist: PlaylistKey, popularityData: PopularityEntry[], averagePopularity: number } = {
        playlist: {
            id: playlist.id,
            name: playlist.name
        },
        // Use popularityData.length instead of tracksList.length because entries without a track property are filtered out
        averagePopularity: Math.round(popularitySum / popularityData.length),
        popularityData
    };

    return NextResponse.json(returnData)
}