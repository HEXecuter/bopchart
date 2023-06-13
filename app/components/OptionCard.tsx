import { IconType } from "react-icons";

interface OptionCardProps {
    icon: IconType,
    name: string
}

const OptionCard: React.FC<OptionCardProps> = ({icon: Icon, name}) => {
    return (
        <div className="cursor-pointer w-fit group">
            <div className="flex-col flex border-black border-4 rounded-lg w-fit group-hover:scale-110 transition">
                <Icon size={200} className=""/>
                <h2 className="text-center text-xl font-bold border-t-4 border-black break-normal max-w-[200px]">{name}</h2>
            </div>
        </div>
    )
};

export default OptionCard;
