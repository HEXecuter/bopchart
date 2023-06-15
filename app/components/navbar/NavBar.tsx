import Link from "next/link";

interface NavBarProps {
    
}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <nav className="w-full h-16 flex items-center justify-center bg-white bg-opacity-30">
            <div className="flex flex-row justify-between mx-8 w-full">
                <Link className="text-center text-3xl font-semibold uppercase cursor-pointer" href="/">
                    Chartify
                </Link>
                <div className="flex items-center justify-center gap-6">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;
