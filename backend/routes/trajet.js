const express = require('express');
const router = express.Router();
const Trajet = require('../models/Trajet'); // Assuming your model is here

// GET all trajets
router.get('/', async (req, res) => {
    try {
        const trajets = await Trajet.find(); // Fetch all trajets from MongoDB
        res.json(trajets); // Send them as JSON array
    } catch (error) {
        console.error('Erreur lors de la récupération des trajets:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
