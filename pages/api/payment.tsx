// const BitcoinGateway = require('bitcoin-receive-payments')
// const gateway = new BitcoinGateway(pub_key, openexchangerates_key)

export default async function handler(req: any, res: any) {
    let purchase_id = JSON.parse(req.body).purchase_id;
    let cost = JSON.parse(req.body).cost;

    /*let address = await gateway.createAddress(purchase_id);

    res.json({
        btc_address: address.address,
        expiration: address.seconds_left,
        btc_amount: gateway.USDtoBIT(cost * 0.00000001) + " BTC"
    });*/

    res.json({
        btc_address: (Math.random() + 1).toString(36).substring(2),
        expiration: 15 * 60,
        btc_amount: cost + " BTC"
    })
}