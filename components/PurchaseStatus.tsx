import { useEffect, useState } from "react";

interface CountdownProps {
    time: number,
    countdown_ended: () => void
}

function Countdown(props: CountdownProps) {
    let [time, set_time] = useState(props.time);
    useEffect(() => {
        let interval = setInterval(() => {
            set_time(prev => prev - 1);
        }, 1000)
        return () => clearInterval(interval)
    }, []);
    useEffect(() => { 
        if(time == 0 || time < 0) {
            props.countdown_ended();
        }
    }, [time])
    return (
        <p className={(time < 60 ? "text-red-500 " : "") + "mt-10 text-sm font-bold"}>{String(Math.floor(time/60)).padStart(2, "0") + ":" + String(time%60).padStart(2, "0")}</p>
    )
}

interface PurchaseStatusProps {
    stage: number,
    address: string | null,
    address_expiration: number,
    amount: string | null,
    renew_address: () => void
}

export default function PurchaseStatus(props: PurchaseStatusProps) {
    let [countdown_ended, set_countdown_ended] = useState(false);
    useEffect(() => {
        set_countdown_ended(false);
    }, [props.address]);
    useEffect(() => {
        if(countdown_ended) {
            props.renew_address();
        }
    }, [countdown_ended]);
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
                        Please send <span className="font-medium">{props.amount}</span> to the bitcoin address below before the timer expires.
                    </p>
                    <p className="mt-8 bg-gray-300 font-light p-1.5 text-xs">{props.address}</p>
                    {
                        !countdown_ended ?
                            <Countdown time={props.address_expiration} countdown_ended={() => set_countdown_ended(true)}/>
                            :
                            <p className="text-red-500 mt-10 text-sm font-bold">TIME EXPIRED</p>
                    }
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