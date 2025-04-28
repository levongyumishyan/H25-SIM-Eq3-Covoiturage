const express = require('express');
const router = express.Router();
const Trajet = require('../models/Trajet');

// POST /api/trajets
router.post('/', async (req, res) => {
  try {
    const { id, long, lat, targetLong, targetLat } = req.body;

    const trajet = new Trajet({ id, long, lat, targetLong, targetLat });
    await trajet.save();

    res.json({ message: "Trajet enregistré", trajet });
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// GET /api/trajets
router.get('/', async (req, res) => {
  try {
    const trajets = await Trajet.find();
    res.json(trajets);
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
