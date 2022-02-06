import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSubSchema = new Schema({
    name: String,
    stock: Number,
    price: Number
});

const categorySchema = new Schema({
    name: String,
    items: [itemSubSchema]
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);