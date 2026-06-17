import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true, lowercase: true, trim: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format'],
  },
  password_hash: { type: String, required: true, select: false },
  language:      { type: String, default: 'en', enum: ['en', 'ur'] },
  muted:         { type: Boolean, default: false },

  // Payment
  payment_status:       { type: String, default: 'trial', enum: ['trial', 'paid'] },
  payment_method:       { type: String, default: null },
  paid_at:              { type: Date, default: null },
  subscription_end_date:{ type: Date, default: null },

  // Password reset
  password_reset_token:   { type: String, default: null, select: false },
  password_reset_expires: { type: Date,   default: null, select: false },

  last_login: { type: Date, default: null },

  isAdmin: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
}, { timestamps: true });

// Verify password
userSchema.methods.matchPassword = async function (plaintext) {
  return bcrypt.compare(plaintext, this.password_hash);
};

// Never return password_hash by default
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password_hash;
    delete ret.password_reset_token;
    delete ret.password_reset_expires;
    return ret;
  },
});

export default mongoose.model('User', userSchema);
