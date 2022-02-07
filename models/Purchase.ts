import mongoose from 'mongoose';
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    email: String,
    item: {
        name: String,
        category_id: String,
        item_id: String
    },
    couponCode: String,
    cost: Number,
    checkout_id: String,
    completed: Boolean
});

export default mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);