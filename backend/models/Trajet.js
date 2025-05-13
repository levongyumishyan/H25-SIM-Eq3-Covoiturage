const mongoose = require('mongoose');

const TrajetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false }, //userId de l'utilisateur qui a créé le trajet
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
  targetLong: { type: Number, required: true },
  targetLat: { type: Number, required: true },
  scheduleDays: [String],
  scheduleTime: String,
  pickupAddress: { type: String, required: true },
  targetAddress: { type: String, required: true },
  distance: { type: Number, required: true },
});

module.exports = mongoose.model('Trajet', TrajetSchema);
