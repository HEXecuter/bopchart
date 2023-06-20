import { Session } from "next-auth";
import { getAccessToken, getCurrentUserPlaylist } from "../lib/spotify";
import Link from "next/link";
import Title from "./Title";
import PlaylistImage from "./PlaylistImage";
import { BsSpotify } from 'react-icons/bs'

interface PlaylistSelectorProps {
    userSession: Session
    baseUrlPath: string
}


const PlaylistSelector: React.FC<PlaylistSelectorProps> = async ({ userSession, baseUrlPath }) => {
    const accessToken = await getAccessToken(userSession.user!.refreshToken)
    const playlistList = await getCurrentUserPlaylist(accessToken);

    return (
        <>
            <Title text="Select a Playlist below to get started" />
            <div className="flex-wrap flex justify-center items-center gap-6 my-6">
                {playlistList.map((playlistItem) => {
                    return (
                        <div key={playlistItem.id} className=" flex items-center gap-3 bg-gray-950 p-4 rounded-xl
                        ">
                            <Link href={`${baseUrlPath}?playlistId=${playlistItem.id}`}>
                                <PlaylistImage playlistItem={playlistItem} />
                            </Link>
                            <div className="flex-col flex items-start justify-center h-20 lg:h-[160px] w-32 lg:w-[20rem] gap-1 lg:gap-3
                            overflow-clip text-ellipsis whitespace-nowrap
                            ">
                                <h2 className="text-base lg:text-3xl font-normal">{playlistItem.name || "Unnamed"}</h2>
                                <p className="text-gray-300 text-sm lg:text-xl">{playlistItem.owner.display_name || "Unknown"}</p>
                                <a href={playlistItem.external_urls.spotify} target="_blank" className="flex gap-2 items-end underline">
                                    <BsSpotify size={25} className="" />
                                    <p className="text-sm lg:text-base">Play on Spotify</p>
                                </a>
                                
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default PlaylistSelector;
