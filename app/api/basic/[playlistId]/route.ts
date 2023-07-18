import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server';
import { getAccessToken, getAllTracksInPlaylist, getBulkAlbums, getBulkArtist, getCurrentUserPlaylist, getPlaylist, getUniqueAlbumsFromTracks, getUniqueArtistsFromTracks } from '@/app/lib/spotify';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


type PlaylistKey = { id: string, name: string }
type PopularityEntry = { count: number, popularity: number }

export async function GET(request: Request, { params }: { params: { playlistId: string } }) {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return new Response("Unauthorized: Please log in to perform this request", { status: 401 })
    }

    const accessToken = await getAccessToken(userSession.user!.refreshToken);
    let playlist = await getPlaylist(params.playlistId, accessToken);

    const tracksList: PlaylistTrackItem[] = [];
    tracksList.push(...(await getAllTracksInPlaylist(playlist.id, accessToken)));

    const trackPopularityMap = new Map<number, number>();

    tracksList.forEach((playlistItem) => {
        if (!playlistItem.track) {
            return;
        }
        const popularity = playlistItem.track.popularity;
        if (trackPopularityMap.has(popularity)) {
            trackPopularityMap.set(popularity, trackPopularityMap.get(popularity)! + 1);
        } else {
            trackPopularityMap.set(popularity, 1);
        }
    })

    const returnData: { playlist: PlaylistKey, popularityData: PopularityEntry[], averagePopularity: number } = {
        playlist: {
            id: playlist.id,
            name: playlist.name
        },
        averagePopularity: 0,
        popularityData: []
    };

    let runningSum = 0
    let runningCount = 0

    trackPopularityMap.forEach((popularityCount, popularity) => {
        runningSum += popularity
        // Use this instead of tracksList.length, because we filtered out items without track property
        runningCount += popularityCount
        returnData.popularityData.push({count: popularityCount, popularity: popularity})
    })

    returnData.averagePopularity = Math.round(runningSum / runningCount);
    
    return NextResponse.json(returnData)
}