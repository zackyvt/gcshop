interface FooterSectionProps {
    name: string,
    links: string[]
}

function FooterSection(props: FooterSectionProps) {
    return (
        <div className="mb-5">
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
        <footer className="-m-12 sm:-m-16 md:-m-20 lg:-m-24 xl:-m-36 2xl:-m-48 !mt-28 p-12 sm:p-16 md:p-20 lg:p-24 xl:p-36 2xl:p-48 !pt-8 !pb-5 text-white bg-zinc-900 flex">
            <div className="mr-28">
                <p className="font-bold">GCShop</p>
                <p className="font-light text-sm mt-1">best giftcards seller</p>
                <p className="text-sm mt-12">Copyright © 2022</p>
            </div>
            <div className="flex flex-wrap">
                <FooterSection name="Resources" links={["Buy", "Warranty"]}/>
                <FooterSection name="Contact" links={["Email", "Discord"]}/>
                <FooterSection name="Legal" links={["Terms of Service", "Privacy Policy"]} />
            </div>
        </footer>
    )
}