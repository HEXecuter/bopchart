import Link from "next/link";

interface NavBarProps {
    
}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <nav className="w-full h-16 flex items-center justify-center bg-white bg-opacity-30">
            <div className="flex flex-row justify-between mx-8 w-full">
                <Link className="text-center text-3xl font-semibold uppercase cursor-pointer" href="/">
                    BopChart
                </Link>
                <div className="flex items-center justify-center gap-6">
                    {/* <Link href="/" className="hover:underline">
                        Home
                    </Link> */}
                    <Link href="/" className="cursor-not-allowed hover:underline">
                        About
                    </Link>
                    <a href="https://github.com/HEXecuter/bopchart" target="_blank" className="hover:underline">
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;
