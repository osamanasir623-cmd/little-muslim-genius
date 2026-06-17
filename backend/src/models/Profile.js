import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name:    { type: String, required: true, trim: true, maxlength: 30 },
  avatar:  { type: String, default: '🐣' },
  age:     { type: Number, required: true, min: 2, max: 14 },
  language_preference: { type: String, default: 'en', enum: ['en', 'ur'] },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
