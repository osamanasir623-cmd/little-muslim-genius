import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true,
  },
  amount_pkr:       { type: Number, required: true },
  currency:         { type: String, default: 'PKR' },
  payment_gateway:  { type: String, required: true, enum: ['stripe', 'jazzcash', 'easypaisa'] },
  transaction_id:   { type: String, default: null },   // gateway's transaction/session ID
  gateway_response: { type: mongoose.Schema.Types.Mixed, default: null }, // raw webhook payload
  status: {
    type: String, required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
