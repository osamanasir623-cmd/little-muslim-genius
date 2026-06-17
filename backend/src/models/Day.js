import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true, unique: true, index: true },
  world: {
    type: String,
    default: 'light',
    enum: ['light', 'compute', 'ai', 'data', 'neuro'],
  },
  title: {
    en: { type: String, required: true },
    ur: { type: String, required: true },
  },
  games:  { type: [mongoose.Schema.Types.Mixed], default: [] },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Day', daySchema);
