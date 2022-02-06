import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponCodeSchema = new Schema({
    name: String,
    discount: Number,
});

export default mongoose.models.CouponCode || mongoose.model('CouponCode', couponCodeSchema);