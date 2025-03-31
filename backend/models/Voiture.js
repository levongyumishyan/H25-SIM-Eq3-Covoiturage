const mongoose = require("mongoose");

const schemaVoiture = new mongoose.Schema({
    modeleVoiture: { type: String, required: true},
    anneeVoiture: { type: String, required: true},
    consommationVoiture: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Voiture", schemaVoiture);