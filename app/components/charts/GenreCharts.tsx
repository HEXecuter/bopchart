'use client'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend)

interface GenreChartsProps {

}

const GenreCharts: React.FC<GenreChartsProps> = () => {
    const [responseData, setResponseData] = useState<[{playlist: {id: string, name: string}, genres: {genre:string, duration: number}[]}]>();
    useEffect(() => {
        console.log('data is being fetched')
        axios.get('/api/genres/artists')
            .then((response) => {
                setResponseData(response.data)
            })
            .catch((error) => console.log(error))
    }, [])

    if (responseData) {
        return (
            <div>
                {responseData.map((entry, index) => {
                    const data = {
                        datasets:[{
                            data: entry.genres.filter((genreEntry, index) => index < 10).map((genreEntry) => genreEntry.duration)
                        }],
                        labels: entry.genres.filter((genreEntry, index) => index < 10).map((genreEntry) => genreEntry.genre)
                    }
                    console.log(data)
                    return (
                        <Doughnut data={data} key={entry.playlist.id}/>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                Data is Loading, please wait
            </div>
        )
    }


};

export default GenreCharts;
