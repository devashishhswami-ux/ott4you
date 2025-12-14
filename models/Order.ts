import mongoose, { Schema, Model } from 'mongoose';

export interface IOrder {
    _id: string;
    userId: string;
    productId: string;
    productName: string;
    platform: string;
    duration: number;
    amount: number;
    paymentId: string;
    razorpayOrderId: string;
    status: 'pending' | 'completed' | 'failed';
    purchaseDate: Date;
}

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
