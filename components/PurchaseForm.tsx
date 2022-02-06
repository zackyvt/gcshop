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

interface PurchaseFormProps {
    coupon_code: string | undefined,
    email: string | undefined,
    purchase_created: boolean,
    order_done: boolean,
    name: string,
    price: number,
    button_callback: (email: string, coupon: string) => void
}

export default function PurchaseForm(props: PurchaseFormProps) {
    let [completed, set_completed] = useState(props.purchase_created);
    let [email, setEmail] = useState(props.email ? props.email : "");
    let [coupon, setCoupon] = useState(props.coupon_code ? props.coupon_code : "");
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const formSubmit = (e: any) => {
        e.preventDefault();
        if(completed) {
            set_completed(false);
            props.button_callback(email, coupon);
        }
        if(email != "" && !completed) {
            set_completed(true);
            props.button_callback(email, coupon);
        }
    };
    return (
        <div className="w-full md:w-1/2">
            <PurchaseInfo name={props.name} price={props.price}/>
            <form className="flex flex-col mt-12" onSubmit={formSubmit}>
            <label className="mb-3" htmlFor="email">Coupon code:</label>
                <input readOnly={completed} onChange={(e) => setCoupon(e.target.value)} value={coupon} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" name="ccode" type="text" placeholder="Coupon code..." />
                <label className="mb-3 mt-6" htmlFor="email">Email address for delivery:</label>
                <input readOnly={completed} onChange={(e) => setEmail(e.target.value)} value={email} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" name="email" type="email" placeholder="Email..." />
                {
                    props.order_done ? <></> :
                        !completed ?
                            <button className={(!validateEmail(email) ? "opacity-50 " : "hover:scale-105 opacity-100 ") + "transition-all mt-10 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md"}>Confirm Purchase</button>
                            :
                            <button className="hover:scale-105 opacity-100 transition-all mt-10 p-2.5 pl-12 pr-12 bg-red-500 text-white font-bold rounded-md">Cancel Purchase</button>
                }
            </form>
        </div>
    )
}