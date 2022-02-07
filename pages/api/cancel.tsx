import dbConnect from "../../lib/dbConnect";
import Purchase from "../../models/Purchase";

export default async function handler(req: any, res: any) {
    await dbConnect();
    await Purchase.findByIdAndDelete(req.query.id);
    res.redirect(303, "/purchase");
}