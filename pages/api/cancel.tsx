import dbConnect from "../../lib/dbConnect";
import Purchase from "../../models/Purchase";

export default async function handler(req: any, res: any) {
    let purchase_id = req.query.checkoutId;
    await dbConnect();

    await Purchase.deleteOne({ checkout_id: purchase_id });

    res.redirect(303, "/purchase");
}