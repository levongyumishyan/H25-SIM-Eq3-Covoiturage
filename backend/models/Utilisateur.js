const mongoose = require("mongoose");

const schemaUtilisateur = new mongoose.Schema({
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", schemaUtilisateur);