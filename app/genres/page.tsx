import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {headers} from 'next/headers'
import Title from "../components/Title";
import GenreCharts from "../components/charts/GenreCharts";


export default async function GenrePage() {
    const userSession = await getServerSession(authOptions);
    if(!userSession){
        redirect('/')
    }
    
    return (
        <main className=''>
            <Title text={`Music Genres for ${userSession.user?.name}`}/>
            <GenreCharts/>
        </main>
    )
}
