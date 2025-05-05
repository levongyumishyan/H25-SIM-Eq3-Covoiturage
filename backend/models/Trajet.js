const mongoose = require('mongoose');

const TrajetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false},
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
  targetLong: { type: Number, required: true },
  targetLat: { type: Number, required: true },
  scheduleDays: [String], // 👈 must be included
  scheduleTime: String     // 👈 must be included
});

module.exports = mongoose.model('Trajet', TrajetSchema);
