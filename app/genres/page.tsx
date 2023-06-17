import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from 'next/headers'
import Title from "../components/Title";
import GenreCharts from "../components/charts/GenreCharts";
import PlaylistSelector from "../components/PlaylistSelector";


export default async function GenrePage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
        redirect('/')
    }

    if ('playlistId' in searchParams) {
        return (
            <main>
                <Title text={`Music Genres for ${userSession.user?.name}`} />
                <GenreCharts playlistId={searchParams.playlistId}/>
            </main>
        )
    }
    return (
        <main className=''>
            <PlaylistSelector userSession={userSession} baseUrlPath="/genres" />
        </main>
    )
}
