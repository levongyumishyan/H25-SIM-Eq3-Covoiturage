const mongoose = require("mongoose");

const schemaTrajet = new mongoose.Schema
(
    {
        nomPlace: {type: any, required: true},
        coordonnees: {type: any, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Trajet", schemaTrajet);