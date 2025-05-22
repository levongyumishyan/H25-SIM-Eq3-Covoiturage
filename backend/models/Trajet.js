const mongoose = require('mongoose');

const TrajetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true,
  },
  long: { type: Number, required: true }, // Longitude de l'utilisateur
  lat: { type: Number, required: true }, // Latitude de l'utilisateur
  targetLong: { type: Number, required: true }, // Longitude de la destination
  targetLat: { type: Number, required: true }, // Latitude de la destination
  scheduleDays: [String], // Journées sélectionnées par l'utilisateur pour le trajet
  scheduleTime: String, // Heures de la journée que l'utilisateur a pris pour le trajet
  pickupAddress: { type: String, required: true }, // Adresse de départ
  targetAddress: { type: String, required: true }, // Adresse de la destination
  distance: { type: Number, required: true },
  places: { type: Number, required: true, min: 1 }, // Nombre de sièges
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }], // Indique qui sont les passagers avec le ObjectId associé à un utilisateur 
}, { timestamps: true });

module.exports = mongoose.model('Trajet', TrajetSchema);
