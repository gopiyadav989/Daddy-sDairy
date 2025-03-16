import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        amountPaid: {
            type: Number,
            required: true,
            min: 0
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'upi', 'bank_transfer'],
            default: 'cash'
        },
        periodCovered: {
            from: Date,
            to: Date
        },
        transactionId: String,
        balanceAfterPayment: {
            type: Number,
            required: true
        },
        remarks: String
    },
    {
        timestamps: true,
        indexes: [{ customerId: 1 }, { date: 1 }]
    }
);

export default model('Payment', PaymentSchema);
