'use client'
import { Bubble } from "react-chartjs-2";
import ChartDeferred from 'chartjs-plugin-deferred';
import { Chart as ChartJS, BarController, CategoryScale, PointElement, LinearScale, Tooltip, Legend, Title, Colors, ChartOptions } from 'chart.js'
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

ChartJS.register(BarController, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Colors, ChartDeferred, Title)
ChartJS.defaults.color = '#FFF'
ChartJS.defaults.font.family = playfair.className;
ChartJS.defaults.responsive = true;
ChartJS.defaults.aspectRatio = 1;
ChartJS.defaults.maintainAspectRatio = false;

interface BasicnessScatterChartProps {
    playlistId: string
}

interface BasicnessResponse {
    playlist: { id: string, name: string },
    averagePopularity: number,
    popularityData: { song_popularity: number, artist_popularity: number, duration: number }[]
}

const BasicnessScatterChart: React.FC<BasicnessScatterChartProps> = ({ playlistId }) => {
    const [responseData, setResponseData] = useState<BasicnessResponse>();

    //TODO: On error, reroute user to pick a playlist. Display toast notification that playlist is invalid
    useEffect(() => {
        axios.get('/api/basic/' + playlistId)
            .then((response) => {
                setResponseData(response.data)
            })
            .catch((error) => console.log(error))
    }, [playlistId])

    if (responseData) {
        const scatterData = {
            datasets: [
                {
                    label: 'Song Duration',
                    data: responseData.popularityData.map((entry) => ({
                        x: entry.song_popularity,
                        y: entry.artist_popularity,
                        r: Math.round(entry.duration / 25)
                    })),
                    radius: 6
                }
            ]
        }

        const scatterOptions: ChartOptions = {
            clip: 20,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'gray',
                        tickColor: 'white',

                    },
                    title: {
                        display: true,
                        font: {
                            size: 20
                        },
                        text: "Song Popularity"
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'gray',
                        tickColor: 'white',

                    },
                    title: {
                        display: true,
                        font: {
                            size: 20
                        },
                        text: "Artist Popularity"
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${responseData.playlist.name} Basicness`,
                    font: {
                        size: 28
                    }
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
            <div className="flex flex-wrap justify-center items-center gap-4 my-16">
                <div className="relative w-[90%] max-w-[900px] min-h-[500px] h-[80vh] bg-gray-900 rounded-xl m-2 p-4">
                    <Bubble data={scatterData} options={scatterOptions} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center gap-4 mt-32">
                <ScaleLoader height={200} width={8} margin={16} color="white" />
            </div>
        )
    }


};

export default BasicnessScatterChart;
