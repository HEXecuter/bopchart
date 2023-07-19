'use client'
import { Bubble, Bar } from "react-chartjs-2";
import ChartDeferred from 'chartjs-plugin-deferred';
import { Chart as ChartJS, BarController, BubbleController, BarElement, CategoryScale, PointElement, LinearScale, Tooltip, Legend, Title, Colors, ChartOptions } from 'chart.js'
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

ChartJS.register(BarController, BubbleController, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Colors, ChartDeferred, Title)
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
    popularityData: { song_popularity: number, artist_popularity: number, duration: number, name: string}[]
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
                        r: Math.round(entry.duration / 25),
                        name: entry.name
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
                            size: 16
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
                            size: 16
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
                        size: 24
                    }
                },
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return tooltipItem.raw.name;
                        }
                    }
                }
            }
        }

        const barData = {
            labels: ['Avg'],
            datasets: [{
                axis: 'x',
                label: 'Percentage',
                data: [responseData.averagePopularity],
            }]
        }

        const barOptions: ChartOptions = {
            indexAxis: 'y',
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
                            size: 16
                        },
                        text: "Basicness"
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${responseData.playlist.name} Playlist Average`,
                    font: {
                        size: 24
                    }
                },
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }

        return (
            <div className="flex flex-col justify-center items-center gap-0 my-8 lg:my-16">
                <div className="relative w-[90%] max-w-[900px] min-h-[400px] h-[70vh] rounded-t-xl bg-gray-900 mx-2 p-4">
                    <Bubble data={scatterData} options={scatterOptions} />
                </div>
                <div className="relative w-[90%] max-w-[900px] min-h-[250px] h-[15vh] rounded-b-xl bg-gray-900 mx-2 p-4 border-t-2 border-gray-400">
                    <Bar data={barData}  options={barOptions}/>
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
