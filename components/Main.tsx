import { useState } from "react";

interface CategoryCardProps {
    id: number,
    name: string,
    active: boolean,
    set_current_category: (id: number) => void
}

function CategoryCard(props: CategoryCardProps) {
    return (
        <div onClick={() => props.set_current_category(props.id)} className={(props.active ? "bg-indigo-800 w-2/5 " : "bg-zinc-800 opacity-70 w-1/5 hover:opacity-90 ") + "p-3 mr-2 transition-all cursor-pointer text-center text-white font-bold rounded-lg"}>
            {props.name}
        </div>
    )
}

interface CategorySelectorProps { }

function CategorySelector(props: CategorySelectorProps) {
    let category_list = [
        "Costco", "Visa", "Ebay", "Steam", "Amazon"
    ];
    let [current_category, set_current_category] = useState(0);
    return (
        <div className="mt-16 flex items-center">
            <img className="mr-6 w-8 h-8 cursor-pointer hover:scale-105 transition-all" src="/images/left-arrow.png" />
            <div className="flex flex-grow">
                {
                    category_list.map((x, i) => <CategoryCard name={x} id={i} key={i} active={i == current_category} set_current_category={set_current_category} />)
                }
            </div>
            <img className="ml-6 w-8 h-8 cursor-pointer hover:scale-105 transition-all" src="/images/right-arrow.png" />
        </div>
    )
}

interface ItemsTableProps {
    items: {
        name: string,
        stock: number,
        price: string
    }[]
}

function ItemsTable(props: ItemsTableProps) {
    return (
        <table className="w-full mt-16 text-center text-sm">
            <tr className="border-b-2 border-black text-base">
                <th className="p-4">Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th className="text-right">Cost: <span className="font-light">$0 USD</span></th>
            </tr>
            {
                props.items.map((x, iter) => (
                    <tr key={iter} className="border-b border-black">
                        <td className="p-5">{x.name}</td>
                        <td>{x.stock}</td>
                        <td>{x.price}</td>
                        <td><img className="w-5 h-5 ml-auto mr-4 hover:scale-110 cursor-pointer" src="/images/plus.png"/></td>
                    </tr>
                ))
            }
        </table>
    )
}

export default function Main() {
    return (
        <div className="mt-24 flex flex-col">
            <h2 className="font-bold text-3xl">Explore Our Gift Cards</h2>
            <p className="mt-4 w-3/5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <CategorySelector />
            <ItemsTable items={[
                {name: "Costco Gift Cards - $2,000 USD", stock: 49, price: "$1,000 USD"},
                {name: "Costco Gift Cards - $2,000 USD", stock: 49, price: "$1,000 USD"},
                {name: "Costco Gift Cards - $2,000 USD", stock: 49, price: "$1,000 USD"},
                {name: "Costco Gift Cards - $2,000 USD", stock: 49, price: "$1,000 USD"}
            ]}/>
            <button className="self-end hover:scale-105 transition-all mt-12 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md">Checkout</button>
        </div>
    )
}