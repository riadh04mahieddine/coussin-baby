import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone?: string; // Ajout du numéro de téléphone
  shippingAddress: {
    name?: string; // Nom du destinataire si différent du client
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  product: {
    name: string;
    color: string;
    bundle: { [key: string]: any };
    options?: { [key: string]: string };
    price: number;
  };
  paymentStatus: 'pending' | 'completed' | 'failed';
  stripeCheckoutId?: string;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: false }, // Ajout du numéro de téléphone
    shippingAddress: {
      name: { type: String, required: false }, // Nom du destinataire si différent
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'France' },
    },
    product: {
      name: { type: String, required: true, default: 'Coussin de Protection pour la Tête' },
      color: { type: String, required: true },
      bundle: { type: Object, required: true },
      options: { type: Map, of: String },
      price: { type: Number, required: true },
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
    stripeCheckoutId: { type: String },
    stripePaymentIntentId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
