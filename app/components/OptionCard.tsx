import Link from "next/link";
import { IconType } from "react-icons";

interface OptionCardProps {
    icon: IconType,
    name: string,
    href: string,
    implemented?: boolean
}

const OptionCard: React.FC<OptionCardProps> = ({icon: Icon, name, href, implemented=false}) => {
    return (
        <Link href={implemented ? href : '/'} className={`w-fit group ${implemented ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
            <div className="flex-col flex border-white border-4 w-fit group-hover:scale-110 transition">
                <Icon size={200} className=""/>
                <div className="w-[200px] h-[4rem] flex-col flex justify-center border-t-4 border-white">
                    <h2 className="text-center m-auto text-xl font-bold  break-normal">{name}</h2>
                </div>
            </div>
        </Link>
    )
};

export default OptionCard;
