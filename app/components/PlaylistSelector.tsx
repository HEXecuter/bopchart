import { Session } from "next-auth";
import { getAccessToken, getCurrentUserPlaylist } from "../lib/spotify";
import Link from "next/link";
import Image from 'next/image';
import Title from "./Title";

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
                        <div key={playlistItem.id} className="max-w-[320px] overflow-clip text-ellipsis whitespace-nowrap
                        bg-[rgba(255,255,255,0.2)] box-content px-6
                        ">
                            <span className="text-lg">{playlistItem.name}</span>
                            <Link href={`${baseUrlPath}?playlistId=${playlistItem.id}`}>
                                <Image src={playlistItem.images[0].url} height={320} width={320} alt="Album cover"
                                    style={{ width: "320px", height: "320px", objectFit: "cover" }}
                                />
                            </Link>
                            <a href={playlistItem.external_urls.spotify} target="_blank">
                                <small className="underline">Listen on Spotify</small>
                            </a>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default PlaylistSelector;
