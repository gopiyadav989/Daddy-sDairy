import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MilkRateSchema = new Schema({
    effectiveFrom: {
        type: Date,
        required: true
    },
    effectiveTo: {
        type: Date
    },
    ratePerLiter: {
        type: Number,
        required: true
    },
    description: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default model('MilkRate', MilkRateSchema);