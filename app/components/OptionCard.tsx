import { IconType } from "react-icons";

interface OptionCardProps {
    icon: IconType,
    name: string
}

const OptionCard: React.FC<OptionCardProps> = ({icon: Icon, name}) => {
    return (
        <div className="cursor-pointer w-fit group">
            <div className="flex-col flex border-white border-4 w-fit group-hover:scale-110 transition">
                <Icon size={200} className=""/>
                <div className="max-w-[200px] min-h-[4rem] flex-col flex justify-center border-t-4 border-white">
                    <h2 className="text-center m-auto text-xl font-bold  break-normal">{name}</h2>
                </div>
            </div>
        </div>
    )
};

export default OptionCard;
