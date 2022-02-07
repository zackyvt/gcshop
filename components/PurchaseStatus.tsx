interface PurchaseStatusProps {
    stage: number
}

export default function PurchaseStatus(props: PurchaseStatusProps) {
    switch(props.stage) {
        case 1:
            return (
                <div className="mb-12 md:mb-0 w-full border border-gray-300 md:w-1/2 ml-0 md:ml-16 p-16 text-center rounded-md flex flex-col justify-center items-center">
                    <h2 className="font-medium text-sm">Stage 1: Purchase Confirmation</h2>
                    <p className="font-light text-sm mt-2">
                        Please fill out your email address and confirm the purchase, this email address will be used to deliver the gift card.
                    </p>
                </div>
            )
        case 2:
            return (
                <div className="mb-12 md:mb-0 w-full border border-gray-300 md:w-1/2 ml-0 md:ml-16 p-16 text-center rounded-md flex flex-col justify-center items-center">
                    <h2 className="font-medium text-sm">Stage 2: Awaiting Payment</h2>
                    <p className="font-light text-sm mt-2">
                        Awaiting the bitcoin payment from CoinQVest. We will send the gift card once payment is received.
                    </p>
                </div>
            )
        case 3:
            return (
                <div className="mb-12 md:mb-0 w-full border border-gray-300 md:w-1/2 ml-0 md:ml-16 p-16 text-center rounded-md flex flex-col justify-center items-center">
                    <h2 className="font-medium text-sm">Stage 3: Purchase Completed</h2>
                    <p className="font-light text-sm mt-2">
                        We have sent the gift card to your email address (note that it might take a few minutes to receive).
                    </p>
                </div>
            )
        default:
            return (<div></div>)
    }
}