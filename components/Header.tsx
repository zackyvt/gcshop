function Navbar() {
    return (
        <div className="flex w-full flex-grow">
            <a className="mr-8 font-bold">Home</a>
            <a className="mr-8 hover:font-medium transition-all cursor-pointer">Warranty</a>
            <a className="mr-8 hover:font-medium transition-all cursor-pointer">Contact</a>
        </div>
    )
}

export default function Header() {
    return (
        <header className="flex items-center">
            <img className="cursor-pointer transition-all hover:scale-105 w-10 h-10 mr-20" src={"/images/logo.png"} alt="logo" />
            <Navbar/>
            <img className="cursor-pointer transition-all hover:scale-105 w-8 h-8" src={"/images/shopping-cart.png"} alt="shopping cart" />
        </header>
    )
}