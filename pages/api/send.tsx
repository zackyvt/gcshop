import dbConnect from "../../lib/dbConnect";
import Purchase from "../../models/Purchase";

import nodemailer from "nodemailer";
import Category from "../../models/Category";
import ItemStock from "../../models/ItemStock";
import email_template from "../../lib/emailTemplate";

function createEmail(email: string, cost: number, item: string, giftcard_number: string) {
    return email_template
        .replace("email_address", email)
        .replace("cost_number", "$" + cost + " USD")
        .replace("quantity_number", "1")
        .replace("giftcard_number", giftcard_number)
        .replace("item_name", item);
}

export default async function handler(req: any, res: any) {
    let purchase_id = JSON.parse(req.body).purchase_id;
    await dbConnect();

    let purchase = await Purchase.findById(purchase_id);
    purchase = purchase.toObject();

    if (purchase.completed) {
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
            html: createEmail(purchase.email, purchase.cost, purchase.item.name, curr_stock), // html body
        });

        res.end()
        return;
    }

    res.end()
}