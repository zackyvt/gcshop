function HeroMain() {
    return (
        <div className="w-1/2">
            <p className="font-light text-xl mb-3.5">GCShop</p>
            <h1 className="font-bold text-5xl">Best Giftcard Seller</h1>
            <p className="mt-8 leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="hover:scale-105 transition-all mt-8 p-3 pl-8 pr-8 bg-indigo-800 text-white font-bold rounded-md">Explore</button>
        </div>
    )
}

export default function Hero() {
    return (
        <div className="mt-28 flex">
            <HeroMain />
            <img className="w-1/2" src="https://www.kindpng.com/picc/m/578-5780272_gift-cards-png-transparent-png.png" />
        </div>
    )
}