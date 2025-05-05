const mongoose = require('mongoose');

const TrajetSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
  targetLong: { type: Number, required: true },
  targetLat: { type: Number, required: true },
  scheduleDays: [String], // 👈 must be included
  scheduleTime: String     // 👈 must be included
});

module.exports = mongoose.model('Trajet', TrajetSchema);
