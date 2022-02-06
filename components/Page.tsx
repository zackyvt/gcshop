import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Page(props: { pageName: string, children: JSX.Element[] | JSX.Element }) {
    return (
        <>
            <Head>
                <title>{props.pageName == "Home" ? "GCShop - Best Giftcards Provider" : props.pageName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="title" content="GCShop - Best Giftcards Provider" />
                <meta name="description" content="GCShop is the best giftcard provider in the market. We offer the lowest prices, up to 50% off the original price with options ranging from $100 giftcards to $2000 gift cards. Our giftcards are tested and high quality (we even offer a full refund for broken gift cards). We accept payment anonymously through the Bitcoin network." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://metatags.io/" />
                <meta property="og:title" content="GCShop - Best Giftcards Provider" />
                <meta property="og:description" content="GCShop is the best giftcard provider in the market. We offer the lowest prices, up to 50% off the original price with options ranging from $100 giftcards to $2000 gift cards. Our giftcards are tested and high quality (we even offer a full refund for broken gift cards). We accept payment anonymously through the Bitcoin network." />
                <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta property="twitter:title" content="GCShop - Best Giftcards Provider" />
                <meta property="twitter:description" content="GCShop is the best giftcard provider in the market. We offer the lowest prices, up to 50% off the original price with options ranging from $100 giftcards to $2000 gift cards. Our giftcards are tested and high quality (we even offer a full refund for broken gift cards). We accept payment anonymously through the Bitcoin network." />
                <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
            </Head>
            <div className="font-sans p-12 sm:p-16 md:p-20 lg:p-24 xl:p-36 2xl:p-48 !pt-10 !pb-0 flex flex-col min-h-screen">
                <Header current_page={props.pageName} />
                <>
                    {props.children}
                </>
                <Footer />
            </div>
        </>
    )
}