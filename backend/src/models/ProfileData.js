import mongoose from 'mongoose';

// One document per child profile — stores all progress + rewards together.
// This lets us load all a child's data in a single DB query.
const profileDataSchema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Profile',
    required: true, unique: true, index: true,
  },

  // ── Day progress ───────────────────────────────────────────────
  current_day:          { type: Number, default: 1 },
  completed_days:       { type: [Number], default: [] },
  last_completed_date:  { type: String, default: null },  // YYYY-MM-DD

  // Timer state: { "7": 2400 }  →  day 7 has 2400 seconds left
  timer_state: { type: Map, of: Number, default: {} },

  // ── Rewards ────────────────────────────────────────────────────
  stars:    { type: Number, default: 0 },
  beads:    { type: Number, default: 0 },
  badges:   { type: Number, default: 0 },
  stickers: { type: Number, default: 0 },

  // Streak
  login_streak:    { type: Number, default: 0 },
  last_login_date: { type: String, default: null },  // YYYY-MM-DD

  // Unlockables
  cartoon_unlocks: { type: [Number], default: [] },  // day numbers
  city_buildings:  { type: [String], default: [] },

  last_accessed_at: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('ProfileData', profileDataSchema);
