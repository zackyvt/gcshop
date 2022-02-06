import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemStockSchema = new Schema({
    name: String,
    item_id: String,
    stock: [String]
});

export default mongoose.models.ItemStock || mongoose.model('ItemStock', itemStockSchema);