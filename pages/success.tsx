import { GetServerSidePropsContext } from "next/types";
import Page from "../components/Page";
import PurchaseStatus from "../components/PurchaseStatus";
import SuccessForm from "../components/SuccessForm";
import dbConnect from "../lib/dbConnect";
import Purchase from "../models/Purchase";

interface SuccessFlowProps {
    name: string,
    price: number,
    email: string,
    couponCode: string
}

export default function SuccessFlow(props: SuccessFlowProps) {
    return (
        <Page pageName="Purchase">
            <main className="mt-20 flex flex-grow flex-col-reverse md:flex-row">
                <SuccessForm {...props}/>
                <PurchaseStatus stage={3} />
            </main>
        </Page>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect();
    let purchase = await Purchase.findById(context.query["purchase_id"]);

    return {
        props: {
            name: purchase.item.name,
            price: purchase.cost,
            email: purchase.email,
            couponCode: purchase.couponCode
        }
    }
}