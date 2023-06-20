import Image from "next/image";
import { LuMusic } from 'react-icons/lu';

interface PlaylistImageProps {
    playlistItem: PlaylistItem
}

const PlaylistImage: React.FC<PlaylistImageProps> = ({ playlistItem }) => {
    if(playlistItem.images.length > 0) {
        return (
            <Image src={playlistItem.images[0].url} height={320} width={320} alt="Album cover"
                style={{ width: "320px", height: "320px", objectFit: "cover" }}
            />
        )
    } else {
        return (
            <div className="w-[320px] h-[320px] bg-gray-900 flex-col flex items-center justify-center">
                <LuMusic size={100} className="text-gray-600"/>
            </div>
        )
    }
};

export default PlaylistImage;
