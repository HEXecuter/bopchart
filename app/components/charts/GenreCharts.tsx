'use client'
import { Doughnut } from "react-chartjs-2";
import autocolors from 'chartjs-plugin-autocolors'
import ChartDeferred from 'chartjs-plugin-deferred';
import { Chart as ChartJS, ArcElement, DoughnutController, Tooltip, Legend, Title } from 'chart.js'
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend, autocolors, ChartDeferred, Title)
ChartJS.defaults.font.size = 32

interface GenreChartsProps {
    playlistId: string
}

const GenreCharts: React.FC<GenreChartsProps> = ({ playlistId }) => {
    const [responseData, setResponseData] = useState<[{ playlist: { id: string, name: string }, genres: { genre: string, duration: number }[] }]>();
    useEffect(() => {
        axios.get('/api/genres/artists/' + playlistId)
            .then((response) => {
                setResponseData(response.data)
            })
            .catch((error) => console.log(error))
    }, [playlistId])

    if (responseData) {
        return (
            <div className="flex flex-wrap justify-center items-center gap-4 my-16">
                {responseData.map((entry, index) => {
                    const data = {
                        datasets: [{
                            data: entry.genres.filter((genreEntry, index) => index < 10).map((genreEntry) => genreEntry.duration)
                        }],
                        labels: entry.genres.filter((genreEntry, index) => index < 10).map((genreEntry) => genreEntry.genre)
                    }

                    const options = {
                        plugins: {
                            title: {
                                display: true,
                                text: entry.playlist.name
                            },
                            autocolors: {
                                mode: 'data'
                            }
                        }
                    }
                    return (
                        <div key={entry.playlist.id} className="bg-[rgba(255,255,255,0.6)] min-h-[900px] min-w-[900px]">
                            <Doughnut data={data} options={options} />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center gap-4 mt-32">
                <ScaleLoader height={200} width={8} margin={16} color="white"/>
            </div>
        )
    }


};

export default GenreCharts;
