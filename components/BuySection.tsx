import { useState, useEffect } from "react";

interface CategoryCardProps {
    id: number,
    name: string,
    active: boolean,
    set_current_category: (id: number) => void
}

function CategoryCard(props: CategoryCardProps) {
    return (
        <div onClick={() => props.set_current_category(props.id)} className={(props.active ? "bg-indigo-800 w-2/5 " : "bg-black opacity-75 w-1/5 hover:opacity-90 ") + "p-3 mr-2 transition-all cursor-pointer text-center text-white font-bold rounded-lg"}>
            {props.name}
        </div>
    )
}

interface CategorySelectorProps {
    category_list: string[],
    set_category: (category: string) => void
}

function CategorySelector(props: CategorySelectorProps) {
    let [current_category, set_current_category_count] = useState(0);
    let [category_slice, set_category_slice] = useState(0);
    let set_current_category = (state: number) => {
        props.set_category(props.category_list[state]);
        set_current_category_count(state);
    }
    return (
        <>
            <div className="mt-16 flex items-center hidden md:flex">
                <img onClick={() => set_category_slice(prev => prev != 0 ? prev - 1 : prev)} className="mr-6 w-8 h-8 cursor-pointer hover:scale-105 transition-all" src="/images/left-arrow.png" />
                <div className="flex flex-grow">
                    {
                        props.category_list.slice(category_slice, category_slice + 5).map((x, i) => <CategoryCard name={x} id={props.category_list.indexOf(x)} key={i} active={props.category_list.indexOf(x) == current_category} set_current_category={set_current_category} />)
                    }
                </div>
                <img onClick={() => set_category_slice(prev => prev != (props.category_list.length - 5) ? prev + 1 : prev)} className="ml-6 w-8 h-8 cursor-pointer hover:scale-105 transition-all" src="/images/right-arrow.png" />
            </div>
            <select onChange={(e) => set_current_category(props.category_list.indexOf(e.target.value))} className="block md:hidden mt-10 -mb-4 w-full p-4 rounded-md bg-white border border-gray-300 outline-indigo-800">
                {
                    props.category_list.map((x, i) => <option key={i} value={x}>{x}</option>)
                }
            </select>
        </>
    )
}

interface ItemsTableProps {
    items: {
        name: string,
        stock: number,
        price: number,
        _id: string
    }[],
    set_selected_item: (item: {
        name: string,
        stock: number,
        price: number,
        _id: string
    } | null) => void
}

function ItemsTable(props: ItemsTableProps) {
    let [selected_item, set_selected_item] = useState(-1);
    useEffect(() => {
        props.set_selected_item(selected_item != -1 && selected_item < props.items.length ? props.items[selected_item] : null);
    }, [selected_item]);
    useEffect(() => {
        set_selected_item(-1);
    }, [props.items]);
    return (
        <table className="w-full mt-16 text-center text-sm">
            <thead>
                <tr className="border-b-2 border-black text-base">
                    <th className="p-4">Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th className="text-right">Cost: <span className="font-light">${selected_item != -1 && selected_item < props.items.length ? props.items[selected_item].price : 0} USD</span></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.items.filter((x) => x.stock > 0).map((x, iter) => (
                        <tr key={iter} className="border-b border-black">
                            <td className="p-5">{x.name}</td>
                            <td>{x.stock}</td>
                            <td>${x.price} USD</td>
                            <td><img onClick={() => {
                                selected_item == iter ? set_selected_item(-1) : set_selected_item(iter)
                            }} className="w-5 h-5 ml-auto mr-4 hover:scale-110 cursor-pointer" src={iter == selected_item ? "/images/check.png" : "/images/plus.png"} /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

interface BuySectionProps {
    categories: {
        _id: string,
        name: string,
        items: {
            name: string,
            stock: number,
            price: number,
            _id: string
        }[]
    }[],
    purchase_callback: (item_id: string, category_id: string) => void
}

export default function BuySection(props: BuySectionProps) {
    let [category, set_category] = useState(props.categories[0].name);
    let [selected_item, set_selected_item] = useState<{
        name: string,
        stock: number,
        price: number,
        _id: string
    } | null>(null);
    return (
        <div id="buy" className="mt-24 flex flex-col">
            <h2 className="font-bold text-3xl">Explore Our Gift Cards</h2>
            <p className="mt-4 w-full md:w-3/4 lg:w-3/5">
                Explore our gift card options, we offer a wide variety of giftcards from different companies at ranging pricepoints.
            </p>
            <CategorySelector set_category={set_category} category_list={props.categories.map((x) => x.name)} />
            <ItemsTable items={props.categories.filter((x) => x.name == category)[0].items} set_selected_item={(item) => set_selected_item(item)} />
            <button onClick={() => selected_item ? props.purchase_callback(selected_item._id, props.categories.filter((x) => x.name == category)[0]._id) : null} className={(!selected_item ? "opacity-50 " : "hover:scale-105 opacity-100 ") + "self-end transition-all mt-12 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md"}>Purchase</button>
        </div>
    )
}