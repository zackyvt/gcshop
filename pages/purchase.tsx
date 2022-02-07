import { GetServerSidePropsContext } from "next/types";
import Page from "../components/Page";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseStatus from "../components/PurchaseStatus";
import dbConnect from "../lib/dbConnect";
import Category from "../models/Category";

interface PurchaseFlowProps {
    category_id: string,
    item_id: string,
    name: string,
    price: number
}

export default function PurchaseFlow(props: PurchaseFlowProps) {
    return (
        <Page pageName="Purchase">
            <main className="mt-20 flex flex-grow flex-col-reverse md:flex-row">
                <PurchaseForm {...props}/>
                <PurchaseStatus stage={1} />
            </main>
        </Page>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    if(!context.query["category"]) return {
        redirect: {
            destination: "/"
        }
    };

    await dbConnect();

    let category = await Category.findById(context.query["category"]);
    const result = category.toObject().items.filter((item: any) => item._id == context.query["item"])[0];
    result._id = result._id.toString();

    return {
        props: {
            category_id: context.query["category"],
            item_id: context.query["item"],
            name: result.name,
            price: result.price
        }
    }
}