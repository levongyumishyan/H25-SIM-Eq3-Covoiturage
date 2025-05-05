const express = require('express');
const router = express.Router();
const Trajet = require('../models/Trajet');

// GET ALL TRAJETS
router.get('/', async (req, res) => {
  try {
    const trajets = await Trajet.find();
    return res.json(trajets);
  } catch (err) {
    console.error('Erreur serveur (GET):', err);
    return res.status(500).json({ msg: "Erreur serveur (GET)" });
  }
});

// ADD A TRAJET
router.post('/', async (req, res) => {
  try {
    const { id, long, lat, targetLong, targetLat, scheduleDays, scheduleTime } = req.body;

    console.log("🛬 Reçu POST:", req.body); // 👈 DEBUG here

    const trajet = new Trajet({ id, long, lat, targetLong, targetLat, scheduleDays, scheduleTime });
    await trajet.save();

    return res.json({ message: "Trajet enregistré", trajet });
  } catch (err) {
    console.error('Erreur serveur (POST):', err);
    return res.status(500).json({ msg: "Erreur serveur (POST)", error: err.message });
  }
});

module.exports = router;
