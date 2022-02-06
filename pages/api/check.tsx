import dbConnect from "../../lib/dbConnect";
import Purchase from "../../models/Purchase";

export default async function handler(req: any, res: any) {
    await dbConnect();
    let purchase = await Purchase.findById(JSON.parse(req.body).purchase_id);
    purchase = purchase.toObject();
    res.json({
        completed: purchase.completed
    });
}