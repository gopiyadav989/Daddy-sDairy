import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CustomerSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    primaryName: {
      type: String,
      required: true
    },
    secondaryName: {
      type: String,
      default: null
    },
    address: {
      street: String,
      city: {
        type: String,
        default: "Lucknow"
      },
      pincode: {
        type: String,
        default: "226028",
      },
      landmark: String
    },
    deliveryPreferences: {
      preferredSession: {
        type: String,
        enum: ['morning', 'evening', 'both'],
        default: 'morning'
      },
      defaultQuantity: {
        morning: { type: Number, default: 0 },
        evening: { type: Number, default: 0 }
      }
    },
    currentBalance: {
      type: Number,
      default: 0
    },
    lastPayment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      default: null 
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      default: 'active'
    },
    notes: String
  },
  { 
    timestamps: true,
    indexes: [{ phoneNumber: 1 }]
  }
);

export default model('Customer', CustomerSchema);
