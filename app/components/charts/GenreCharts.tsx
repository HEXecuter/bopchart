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
ChartJS.defaults.aspectRatio = 1;
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
                                    size: 24
                                }
                            },
                            autocolors: {
                                mode: 'data'
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 16
                                    }
                                }
                            }
                        }
                    }
                    return (
                        <div key={entry.playlist.id} className="relative w-[90%] max-w-[900px] min-h-[500px] h-[80vh] bg-gray-900 rounded-xl m-2 p-4">
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
