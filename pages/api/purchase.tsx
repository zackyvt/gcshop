import dbConnect from "../../lib/dbConnect";
import CouponCode from "../../models/CouponCode";
import Purchase from "../../models/Purchase";

export default async function handler(req: any, res: any) {
    await dbConnect();
    let cost = JSON.parse(req.body).price;

    let coupon = await CouponCode.findOne({name: JSON.parse(req.body).couponCode});
    if(coupon) {
        coupon = coupon.toObject();
        cost -= (cost * coupon.discount);
    }

    Purchase.create({
        email: JSON.parse(req.body).email,
        completed: false,
        item: {
            name: JSON.parse(req.body).name,
            category_id: JSON.parse(req.body).category_id,
            item_id: JSON.parse(req.body).item_id
        },
        couponCode: (coupon != null ? coupon.name : null),
        cost: cost
    }, (_, result) => {
        res.json({id: result._id, cost: cost})
    });
}