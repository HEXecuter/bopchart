import Link from "next/link";

interface NavBarProps {
    
}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <nav className="fixed top-0 z-10 w-full h-16 flex items-center justify-center">
            <div className="flex flex-row justify-between mx-8 w-full">
                <span className="text-center text-3xl font-semibold uppercase">
                    Chartify
                </span>
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
