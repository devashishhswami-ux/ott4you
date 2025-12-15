import mongoose, { Schema, Model } from 'mongoose';

export interface IDuration {
    months: number;
    price: number;
}

export interface IProduct {
    _id: string;
    name: string;
    platform: string;
    description: string;
    logo: string;
    durations: IDuration[];
    features: string[];
    active: boolean;
    stock: number;
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
        enum: ['Prime Video', 'Spotify', 'YouTube Premium', 'JioHotstar', 'Jio Saavn', 'SonyLIV'],
    },
    description: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    durations: [{
        months: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    features: [String],
    active: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        default: 999,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
