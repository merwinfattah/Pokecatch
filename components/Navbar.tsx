import Link from "next/link"


export const Navbar = () => {
    return (
            <nav className={` bg-white w-full drop-shadow-md h-fit flex justify-center items-center gap-5 py-5 `}>
                <Link href="/">
                    Home
                </Link>
                <Link href="/pokemon-detail">
                    Pokemon Detail
                </Link>
                <Link href="/my-pokemon">
                    My Pokemon
                </Link>
            </nav>
    ) 
}