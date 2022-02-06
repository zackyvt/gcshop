interface NavbarProps {
    nav_items: {name: string, path: string}[],
    current_page: string
}

function Navbar(props: NavbarProps) {
    return (
        <div className="hidden md:block flex w-full flex-grow">
            {
                props.nav_items.map((item, iter) => {
                    if(props.current_page == item.name) {
                        return <a key={iter} className="mr-8 font-bold">{item.name}</a>
                    }
                    return <a key={iter} href={item.path} className="mr-8 hover:font-medium transition-all cursor-pointer">{item.name}</a>
                })
            }
        </div>
    )
}

export default function Header(props: {current_page: string}) {
    return (
        <header className="flex items-center">
            <img onClick={() => window.location.href = "/"} className="cursor-pointer transition-all hover:scale-105 w-10 h-10 mr-20" src={"/images/logo.png"} alt="logo" />
            <Navbar current_page={props.current_page} nav_items={[
                {name: "Home", path: "/"},
                {name: "Buy", path: "/#buy"},
                {name: "Warranty", path: "/#warrant"},
                {name: "Contact", path: "/#contact"}
            ]}/>
            <div className="flex-grow block md:hidden"/>
            <img className="cursor-pointer transition-all hover:scale-105 w-8 h-8" src={"/images/shopping-cart.png"} alt="shopping cart" />
        </header>
    )
}