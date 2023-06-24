import Link from "next/link"


export const Navbar = () => {
    return (
            <nav className={` bg-black text-white w-full drop-shadow-md h-fit flex justify-center items-center gap-5 py-5 `}>
                <Link href="/">
                    Home
                </Link>
                <Link href="/my-pokemon">
                    Collections
                </Link>
            </nav>
    ) 
}