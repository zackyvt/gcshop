import { useState } from "react";

function PurchaseInfo(props: {name: string, price: number}) {
    return (
        <div>
            <h2 className="font-bold text-3xl">Purchase</h2>
            <p className="mt-6 w-full font-bold leading-7">
                Item: <span className="font-normal ml-1">{props.name}</span><br />
                Amount: <span className="font-normal ml-1">1</span><br />
                Price: <span className="font-normal ml-1">${props.price} USD</span><br />
            </p>
        </div>
    )
}

interface PurchaseFlowProps {
    category_id: string,
    item_id: string,
    name: string,
    price: number
}

export default function PurchaseForm(props: PurchaseFlowProps) {
    let [email, setEmail] = useState("");
    let [coupon, setCoupon] = useState("");
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const formSubmit = (e: any) => {
        if(email == "") e.preventDefault();
    };
    return (
        <div className="w-full md:w-1/2">
            <PurchaseInfo name={props.name} price={props.price}/>
            <form className="flex flex-col mt-12" onSubmit={formSubmit} action="/api/purchase" method="POST">
                <input readOnly={true} className="hidden" name="name" value={props.name} />
                <input readOnly={true} className="hidden" name="item_id" value={props.item_id} />
                <input readOnly={true} className="hidden" name="category_id" value={props.category_id} />
                <input readOnly={true} className="hidden" name="price" value={props.price} />
                <label className="mb-3" htmlFor="email">Coupon code:</label>
                <input onChange={(e) => setCoupon(e.target.value)} value={coupon} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" name="couponCode" type="text" placeholder="Coupon code..." />
                <label className="mb-3 mt-6" htmlFor="email">Email address for delivery:</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" type="email" placeholder="Email..." />
                <button className={(!validateEmail(email) ? "opacity-50 " : "hover:scale-105 opacity-100 ") + "transition-all mt-10 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md"}>Confirm Purchase</button>
            </form>
        </div>
    )
}