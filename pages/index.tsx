
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";

export default function Home() {
    return (
        <>
            <Head>
                <title>GCShop</title>
            </Head>
            <div className="font-sans p-24 pt-10 pb-0 flex flex-col">
                <Header/>
                <Hero/>
                <Main/>
                <Footer/>
            </div>
        </>
    )
}