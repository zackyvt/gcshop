
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BuySection from "../components/BuySection";
import dbConnect from "../lib/dbConnect";
import Category from "../models/Category";
import Page from "../components/Page";

interface Props {
    categories: {
        _id: string,
        name: string,
        items: {
            name: string,
            stock: number,
            price: number,
            _id: string
        }[]
    }[]
};

export default function Home(props: Props) {
    return (
        <Page pageName="Home">
            <Hero />
            <main className="flex-grow">
                <BuySection categories={props.categories} purchase_callback={(item_id, category_id) => window.location.href = "/purchase?item=" + item_id + "&category=" + category_id} />
            </main>
        </Page>
    )
}

export async function getServerSideProps() {
    await dbConnect();

    const result = await Category.find({});
    const categories = result.map((doc) => {
        const category = doc.toObject();
        category._id = category._id.toString();
        category.items = category.items.map((x: any) => {
            const item = x;
            item._id = item._id.toString();
            return item;
        });
        return category;
    });

    return {
        props: { categories: categories }
    }
}