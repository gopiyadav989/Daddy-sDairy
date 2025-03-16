import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DailyMilkDeliverySchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
            default: () => {
                const now = new Date();
                return new Date(now.setHours(0, 0, 0, 0) + (5.5 * 60 * 60 * 1000));
            }
        },
        rate: {
            type: Number,
            required: true
        },
        deliveries: [{
            customerId: {
                type: Schema.Types.ObjectId,
                ref: 'Customer',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
            session: {
                type: String,
                enum: ['morning', 'evening'],
                required: true,
            },
            status: {
                type: String,
                enum: ['delivered', 'skipped', 'returned'],
                default: 'delivered'
            },
        }],
        summary: {
            totalLiters: {
                type: Number,
                default: 0
            },
            totalAmount: {
                type: Number,
                default: 0
            },
            morningDeliveries: {
                type: Number,
                default: 0
            },
            eveningDeliveries: {
                type: Number,
                default: 0
            }
        }
    },
    {
        timestamps: true,
        indexes: [{ date: 1 }, { 'deliveries.customerId': 1 }]
    }
);


DailyMilkDeliverySchema.pre('save', function (next) {
    const deliveries = this.deliveries;
    this.summary = deliveries.reduce((acc, delivery) => {
        if (delivery.status === 'delivered') {
            acc.totalLiters += delivery.quantity;
            acc.totalAmount += delivery.quantity * this.rate;
            if (delivery.session === 'morning') acc.morningDeliveries++;
            else acc.eveningDeliveries++;
        }
        return acc;
    }, {
        totalLiters: 0,
        totalAmount: 0,
        morningDeliveries: 0,
        eveningDeliveries: 0
    });
    next();
});

export default model('DailyMilkDelivery', DailyMilkDeliverySchema);
