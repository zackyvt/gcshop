import dbConnect from "../../lib/dbConnect";
import CouponCode from "../../models/CouponCode";
import Purchase from "../../models/Purchase";
import CoinqvestClient from "coinqvest-merchant-sdk"

export default async function handler(req: any, res: any) {
    if (req.method == "POST") {
        try {
            await dbConnect();
            let cost = req.body.price;

            let coupon = await CouponCode.findOne({ name: req.body.couponCode });
            if (coupon) {
                coupon = coupon.toObject();
                cost -= (cost * coupon.discount);
            }

            const client = new CoinqvestClient(process.env.COINQVEST_API_KEY, process.env.COINQVEST_API_SECRET);
            await client.post('/customer', { customer: { email: req.body.email } }, (response: any) => {
                client.post('/checkout/hosted',
                {
                    charge: {
                        customerId: response.data.customerId, // associates this charge with a customer
                        currency: 'USD', // specifies the billing currency
                        lineItems: [{ // a list of line items included in this charge
                            description: req.body.name,
                            netAmount: req.body.price,
                            quantity: 1
                        }],
                        discountItems: !coupon ? null : [{ // an optional list of discounts
                            description: coupon.name,
                            netAmount: (req.body.price - cost)
                        }]
                    },
                    links: {
                        cancelUrl: req.headers.origin + "/api/cancel",
                        returnUrl: req.headers.origin + "/api/success"
                    },
                    settlementCurrency: 'BTC' // specifies in which currency you want to settle
                }, async (n_response: any) => {
                    console.log(n_response);
                    console.log(n_response.data.id)

                    await Purchase.create({
                        email: req.body.email,
                        completed: false,
                        item: {
                            name: req.body.name,
                            category_id: req.body.category_id,
                            item_id: req.body.item_id
                        },
                        couponCode: (coupon != null ? coupon.name : null),
                        cost: cost,
                        _id: mongoose.Types.ObjectId(n_response.data.id)
                    });
        
                    res.redirect(n_response.data.url);
                });
            });
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}