const mongoose = require("mongoose");
const Voiture = require("../models/Voiture"); 

const schemaUtilisateur = new mongoose.Schema({
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    telephone: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    estConnecte: { type: Boolean, required: false},
    dateNaissance: {type: Date, required: true},
    conducteur: {type: Boolean, required: false},
    passager: {type: Boolean, required: false},
    voiture: {type: mongoose.Schema.Types.ObjectId, required: false} //objectid unique de la voiture de l'utilisateur
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", schemaUtilisateur);