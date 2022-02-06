function HeroMain() {
    return (
        <div className="w-full md:w-1/2">
            <p className="font-light text-xl mb-3.5">GCShop</p>
            <h1 className="font-bold text-5xl">Best Giftcards Seller</h1>
            <p className="mt-8 leading-7">
                GCShop is the best giftcard provider in the market. We offer the lowest prices, up to 50% off the original price with options ranging from $100 giftcards to $2000 gift cards. Our giftcards are tested and high quality (we even offer a full refund for broken gift cards). We accept payment anonymously through the Bitcoin network. 
            </p>
            <button className="hover:scale-105 transition-all mt-8 p-3 pl-8 pr-8 bg-indigo-800 text-white font-bold rounded-md">Explore</button>
        </div>
    )
}

export default function Hero() {
    return (
        <div className="mt-28 flex flex-col-reverse md:flex-row">
            <HeroMain />
            <img className="w-full md:w-1/2 mb-10 -mt-12 md:mb-0 md:mt-0" src="https://www.kindpng.com/picc/m/578-5780272_gift-cards-png-transparent-png.png" />
        </div>
    )
}