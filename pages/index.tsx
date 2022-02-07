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
                <div className="mt-16" id="warranty">
                    <h2 className="font-bold text-3xl">Warranty</h2>
                    <p className="mt-4">
                        We guarantee a full cash refund for any broken gift cards if reported within the first 10 minutes of the purchase. You may report the broken gift card either by contacting us through our email or by opening a ticket in our discord server, see the Contact section for more information.
                    </p>
                </div>
                <div className="mt-16" id="contact">
                    <h2 className="font-bold text-3xl">Contact</h2>
                    <p className="mt-4">
                        You can contact us in one of two ways: either through discord or through email. If you join our discord server, you will be able to open a ticket if you need any support in regards to using our site. You might get slower replies if you contact us through email.
                    </p>
                    <div className="flex flex-col md:flex-row mt-10">
                        <button onClick={() => window.location.href = "https://discord.gg/9T97P9KAXa"} className="hover:scale-105 transition-all mb-3 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md mr-0 md:mr-4">Join our Discord</button>
                        <button onClick={() => window.location.href = "mailto:youandgha@gmail.com"} className="hover:scale-105 transition-all mb-3 p-2.5 pl-12 pr-12 bg-indigo-800 text-white font-bold rounded-md">Email Us</button>
                    </div>
                </div>
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