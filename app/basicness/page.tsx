import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Title from "../components/Title";
import PlaylistSelector from "../components/PlaylistSelector";
import BasicnessScatterChart from "../components/charts/BasicnessScatterChart";


export default async function GenrePage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
        redirect('/')
    }

    if ('playlistId' in searchParams) {
        return (
            <main>
                <Title text={`Basicness score for ${userSession.user?.name}`} />
                <BasicnessScatterChart playlistId={searchParams.playlistId} />
            </main>
        )
    }

    return (
        <main>
            <PlaylistSelector userSession={userSession} baseUrlPath="/basicness" />
        </main>
    )
}
