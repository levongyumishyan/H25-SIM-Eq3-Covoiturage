const mongoose = require('mongoose');

// Define the schema
const TrajetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  long: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  targetLong: {
    type: Number,
    required: true
  },
  targetLat: {
    type: Number,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Trajet', TrajetSchema);
