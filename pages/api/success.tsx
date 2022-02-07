import dbConnect from "../../lib/dbConnect";
import Purchase from "../../models/Purchase";

import nodemailer from "nodemailer";
import Category from "../../models/Category";
import ItemStock from "../../models/ItemStock";
import email_template from "../../lib/emailTemplate";

function createEmail(_email: string, cost: number, item: string, giftcard_number: string, coupon: string) {
    return email_template
        .replace("{cost}", String(cost))
        .replace("{giftcard}", giftcard_number)
        .replace("{item_name}", item)
        .replace("{coupon_code}", coupon ? coupon : "-");
}

export default async function handler(req: any, res: any) {
    let purchase_id = req.query.checkoutId;
    await dbConnect();

    let purchase = await Purchase.findOne({ checkout_id: purchase_id });
    if(purchase.completed === true) {
        res.redirect("/success?purchase_id=" + purchase._id);
        return;
    }
    purchase.completed = true;
    await purchase.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_PASSWORD // naturally, replace both with your real credentials or an application-specific password
        }
    });

    let category = await Category.findByIdAndUpdate(purchase.item.category_id);
    category.items.filter((x: any) => x._id == purchase.item.item_id)[0].stock -= 1;

    await category.save();

    let itemStock = await ItemStock.findOne({ item_id: purchase.item.item_id });
    let curr_stock = itemStock.stock.pop();

    await itemStock.save();

    let info = await transporter.sendMail({
        from: process.env.GMAIL_ADDRESS, // sender address
        to: purchase.email, // list of receivers
        subject: "Your giftcard purchase has arrived!", // Subject line
        html: createEmail(purchase.email, purchase.cost, purchase.item.name, curr_stock, purchase.couponCode), // html body
    });

    res.redirect("/success?purchase_id=" + purchase._id);
}