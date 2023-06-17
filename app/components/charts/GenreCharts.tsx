'use client'
import { Doughnut } from "react-chartjs-2";
// import autocolors from 'chartjs-plugin-autocolors'
import ChartDeferred from 'chartjs-plugin-deferred';
import { Chart as ChartJS, ArcElement, DoughnutController, Tooltip, Legend, Title, Colors } from 'chart.js'
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend, Colors, ChartDeferred, Title)
ChartJS.defaults.color = '#FFF'
ChartJS.defaults.font.family = playfair.className;
ChartJS.defaults.responsive = true;
ChartJS.defaults.aspectRatio = 2;
ChartJS.defaults.maintainAspectRatio = false;

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
                                text: entry.playlist.name,
                                font: {
                                    size: 32
                                }
                            },
                            autocolors: {
                                mode: 'data'
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 24
                                    }
                                }
                            }
                        }
                    }
                    return (
                        <div key={entry.playlist.id} className="relative min-h-[800px] min-w-[400px] md:min-h-[900px] md:min-w-[900px]">
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
