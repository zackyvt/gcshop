import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import Page from "../components/Page";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseStatus from "../components/PurchaseStatus";
import { eraseCookie, getCookie, setCookie } from "../lib/cookies";
import dbConnect from "../lib/dbConnect";
import Category from "../models/Category";
import Purchase from "../models/Purchase";

async function makePurchase(email: string, coupon_code: string, props: PurchaseFlowProps) {
    let raw = await fetch("/api/purchase", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            category_id: props.category_id,
            item_id: props.item_id,
            name: props.name,
            price: props.price,
            couponCode: coupon_code
        })
    });
    let json = await raw.json();
    return json;
}

async function cancelPurchase() {
    let purchase_id = getCookie("purchase_id");
    eraseCookie("purchase_id");
    await fetch("/api/cancel", {
        method: "POST",
        body: JSON.stringify({
            purchase_id: purchase_id
        })
    });
}

async function completePurchase() {
    let purchase_id = getCookie("purchase_id");
    eraseCookie("purchase_id");
    await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
            purchase_id: purchase_id
        })
    });
}

interface PurchaseFlowProps {
    couponCode: string | undefined,
    existing_purchase: boolean,
    email: string | undefined,
    category_id: string,
    item_id: string,
    name: string,
    price: number
}

export default function PurchaseFlow(props: PurchaseFlowProps) {
    let [stage, set_stage] = useState(props.existing_purchase ? 2 : 1);
    let [address, set_address] = useState("");
    let [address_expiration, set_address_expiration] = useState(0);
    let [btc_amount, set_btc_amount] = useState("");
    let [real_price, set_real_price] = useState(props.price);

    let renew_address = () => {
        fetch("/api/payment", {
            method: "POST",
            body: JSON.stringify({
                cost: real_price,
                purchase_id: getCookie("purchase_id")
            })
        }).then(response => {
            response.json().then((val) => {
                set_address(val.btc_address);
                set_btc_amount(val.btc_amount);
                set_address_expiration(val.expiration);
            });
        })
    };

    useEffect(() => {
        if (props.existing_purchase) {
            renew_address();
        }
    }, [])

    useEffect(() => {
        if (stage == 2) {
            let query = setInterval(() => {
                fetch("/api/check", {
                    method: "POST",
                    body: JSON.stringify({
                        purchase_id: getCookie("purchase_id")
                    })
                }).then(response => {
                    response.json().then((val) => {
                        if (val.completed) {
                            set_stage(3);
                            completePurchase();
                            clearInterval(query);
                        }
                    });
                })
                return () => clearInterval(query);
            }, 20000);
        }
    }, [stage])

    return (
        <Page pageName="Purchase">
            <main className="mt-20 flex flex-grow flex-col-reverse md:flex-row">
                <PurchaseForm coupon_code={props.couponCode} email={props.email} purchase_created={stage > 1} order_done={stage == 3} name={props.name} price={real_price} button_callback={(email, coupon) => {
                    if (stage == 2) {
                        set_stage(1);
                        cancelPurchase();
                        return;
                    }
                    makePurchase(email, coupon, props).then((res) => {
                        setCookie("purchase_id", res.id, 1);
                        set_stage(2);
                        set_real_price(res.cost);
                        renew_address();
                    });
                }} />
                <PurchaseStatus address_expiration={address_expiration} stage={stage} address={address} amount={btc_amount} renew_address={() => renew_address()} />
            </main>
        </Page>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect();

    if (context.req.cookies.purchase_id) {
        let existing_purchase = await Purchase.findById(context.req.cookies.purchase_id);
        const result = existing_purchase.toObject();
        return {
            props: {
                email: result.email,
                existing_purchase: true,
                category_id: result.item.category_id,
                item_id: result.item.item_id,
                name: result.item.name,
                price: result.cost,
                couponCode: result.couponCode
            }
        }
    }

    let category = await Category.findById(context.query["category"]);
    const result = category.toObject().items.filter((item: any) => item._id == context.query["item"])[0];
    result._id = result._id.toString();

    return {
        props: {
            existing_purchase: false,
            category_id: context.query["category"],
            item_id: context.query["item"],
            name: result.name,
            price: result.price
        }
    }
}