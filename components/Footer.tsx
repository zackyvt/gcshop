interface FooterSectionProps {
    name: string,
    links: string[]
}

function FooterSection(props: FooterSectionProps) {
    return (
        <div>
            <p className="font-bold text-sm mr-16 mb-2.5">{ props.name }</p>
            <div className="flex flex-col">
                {
                    props.links.map((x, iter) => <a key={iter} className="text-xs mb-1 transition-all hover:font-bold cursor-pointer">{x}</a>)
                }
            </div>
        </div>
    )
}

export default function Footer() {
    return (
        <footer className="-mr-24 -ml-24 p-28 pt-8 pb-5 text-white mt-28 bg-zinc-900 flex">
            <div className="mr-28">
                <p className="font-bold">GCShop</p>
                <p className="font-light text-sm mt-1">best giftcards seller</p>
                <p className="text-sm mt-12">Copyright © 2022</p>
            </div>
            <div className="flex">
                <FooterSection name="Resources" links={["Buy", "Purchases", "Warranty"]}/>
                <FooterSection name="Contact" links={["Email", "Discord"]}/>
                <FooterSection name="Legal" links={["Terms of Service", "Privacy Policy"]} />
            </div>
        </footer>
    )
}