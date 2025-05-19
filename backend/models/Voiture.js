const mongoose = require("mongoose");

const schemaVoiture = new mongoose.Schema({
    modeleVoiture: { type: String, required: true },
    anneeVoiture: { type: String, required: true },
    consommationVoiture: { type: String, required: true }, // La consommation moyenne de l'essence
}, { timestamps: true });

module.exports = mongoose.model("Voiture", schemaVoiture);