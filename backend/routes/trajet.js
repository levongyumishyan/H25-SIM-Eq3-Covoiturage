/**
 * @file Trajet route handler using Express Router.
 * This module defines API endpoints to manage Trajets in the database.
 * 
 * @module routes/trajet
 */

const express = require('express');
const router = express.Router();
const Trajet = require('../models/Trajet');

/**
 * GET /
 * 
 * Route pour récupérer tous les trajets enregistrés dans la base de données.
 * 
 * @route GET /trajets
 * @group Trajets - Opérations liées aux trajets
 * @returns {Array.<Trajet>} 200 - Liste des trajets trouvés
 * @returns {Object} 500 - Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const trajets = await Trajet.find();
    return res.json(trajets);
  } catch (err) {
    console.error('Erreur serveur (GET):', err);
    return res.status(500).json({ msg: "Erreur serveur (GET)" });
  }
});

/**
 * POST /
 * 
 * Route pour ajouter un nouveau trajet dans la base de données.
 * 
 * @route POST /trajets
 * @group Trajets - Opérations liées aux trajets
 * @param {Object} req.body - Données du trajet
 * @param {string} req.body.id - Identifiant de l'utilisateur
 * @param {number} req.body.long - Longitude du point de départ
 * @param {number} req.body.lat - Latitude du point de départ
 * @param {number} req.body.targetLong - Longitude de destination
 * @param {number} req.body.targetLat - Latitude de destination
 * @param {Array.<string>} req.body.scheduleDays - Jours de récurrence du trajet
 * @param {string} req.body.scheduleTime - Heure prévue du trajet (format HH:mm)
 * @returns {Object} 200 - Objet contenant un message de succès et le trajet enregistré
 * @returns {Object} 500 - Erreur serveur
 */
router.post('/', async (req, res) => {
  try {
    const {userId, long, lat, targetLong, targetLat, scheduleDays, scheduleTime } = req.body;

    console.log("🛬 Reçu POST:", req.body); // 👈 DEBUG

    const trajet = new Trajet({userId, long, lat, targetLong, targetLat, scheduleDays, scheduleTime });
    await trajet.save();

    return res.json({ message: "Trajet enregistré", trajet });
  } catch (err) {
    console.error('Erreur serveur (POST):', err);
    return res.status(500).json({ msg: "Erreur serveur (POST)", error: err.message });
  }
});

module.exports = router;