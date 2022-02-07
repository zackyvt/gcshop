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

interface SuccessFlowProps {
    name: string,
    price: number,
    email: string,
    couponCode: string
}

export default function PurchaseForm(props: SuccessFlowProps) {
    return (
        <div className="w-full md:w-1/2">
            <PurchaseInfo name={props.name} price={props.price}/>
            <form className="flex flex-col mt-12">
                <label className="mb-3" htmlFor="email">Coupon code:</label>
                <input readOnly={true} value={props.couponCode} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" name="couponCode" type="text" placeholder="Coupon code..." />
                <label className="mb-3 mt-6" htmlFor="email">Email address for delivery:</label>
                <input readOnly={true} name="email" value={props.email} className="border-gray-400 border outline-indigo-800 p-2.5 text-sm rounded-md" type="email" placeholder="Email..." />
            </form>
        </div>
    )
}