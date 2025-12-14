import mongoose, { Schema, Model } from 'mongoose';

export interface IOrder {
    _id: string;
    userId: string;
    productId: string;
    productName: string;
    platform: string;
    duration: number;
    amount: number;
    paymentId?: string;
    razorpayOrderId?: string;
    paymentMethod: 'RAZORPAY' | 'MANUAL_UPI';
    manualPaymentDetails?: {
        utr: string;
        screenshot: string;
    };
    status: 'pending' | 'completed' | 'failed' | 'pending_verification';
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
        required: false, // Changed to false for manual
    },
    razorpayOrderId: {
        type: String,
        required: false, // Changed to false for manual
    },
    paymentMethod: {
        type: String,
        enum: ['RAZORPAY', 'MANUAL_UPI'],
        default: 'RAZORPAY',
    },
    manualPaymentDetails: {
        utr: String,
        screenshot: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'pending_verification'],
        default: 'pending',
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
