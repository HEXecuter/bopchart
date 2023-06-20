import Image from "next/image";
import { LuMusic } from 'react-icons/lu';

interface PlaylistImageProps {
    playlistItem: PlaylistItem
}

const PlaylistImage: React.FC<PlaylistImageProps> = ({ playlistItem }) => {
    if(playlistItem.images.length > 0) {
        return (
            <Image src={playlistItem.images[0].url} height={180} width={180} alt="Album cover"
                // style={{ width: "320px", height: "320px", objectFit: "cover" }}
                className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] object-cover"
            />
        )
    } else {
        return (
            <div className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] bg-gray-900 flex-col flex items-center justify-center">
                <LuMusic size={50} className="text-gray-600"/>
            </div>
        )
    }
};

export default PlaylistImage;
