/**
 * @file Trajet route handler using Express Router.
 * This module defines API endpoints to manage Trajets in the database.
 * 
 * @module routes/trajet
 */

const express = require('express');
const router = express.Router();
const Trajet = require('../models/Trajet');
const Utilisateur = require('../models/Utilisateur'); // Assuming your user model is here
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
    const trajets = await Trajet.find().populate('userId', 'prenom nom');
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
 */
router.post('/', async (req, res) => {
  try {
    const {
      userId, long, lat, targetLong, targetLat,
      scheduleDays, scheduleTime, pickupAddress,
      targetAddress, distance, places
    } = req.body;

    console.log("Reçu POST:", req.body);

    const trajet = new Trajet({
      userId, long, lat, targetLong, targetLat,
      scheduleDays, scheduleTime, pickupAddress,
      targetAddress, distance, places 
    });

    await trajet.save();
    return res.json({ message: "Trajet enregistré", trajet });

  } catch (err) {
    console.error('Erreur serveur (POST):', err);
    return res.status(500).json({ msg: "Erreur serveur (POST)", error: err.message });
  }
});

/**
 * POST /getTrajets
 * 
 * Authentifie un utilisateur et retourne ses trajets.
 */
router.post("/getTrajets", async (req, res) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

  const userId = req.body.userId.toLowerCase();

  try {
    const utilisateur = await Utilisateur.findOne({ userId });
    if (!utilisateur) return res.status(400).json({ msg: "Email introuvable" });

    const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!isMatch) return res.status(400).json({ msg: "aucun trajet pour cet utilisateur" });

    res.json({
      token,
      trajet: {
        long,
        lat,
        targetLong,
        targetLat,
        pickupAddress,
        targetAddress,
        distance,
        places
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur server" });
  }
});

/**
 * POST /updateTrajet
 * 
 * Met à jour ou crée un trajet.
 */
router.post("/updateTrajet", async (req, res) => {
  const { id, long, lat, targetLong, targetLat } = req.body;

  try {
    let trajet = await Trajet.findOne({ id });
    if (!trajet) {
      trajet = new Trajet({ id, long, lat, targetLong, targetLat });
      await trajet.save();
    } else {
      await Trajet.updateOne(
        { id },
        { long, lat, targetLong, targetLat }
      );
    }

    res.json({ trajet });
  } catch (err) {
    console.error("Erreur serveur trajet:", err);
    res.status(500).json({ msg: "Erreur server" });
  }
});

/**
 * POST /trajets/:id/join
 * 
 * Ajoute un utilisateur à la liste des passagers d’un trajet donné.
 */
router.post('/:id/join', async (req, res) => {
  const { userId } = req.body;
  const trajetId = req.params.id;

  if (!userId) return res.status(400).json({ msg: 'userId requis' });

  try {
    const trajet = await Trajet.findById(trajetId);
    if (!trajet) {
      return res.status(404).json({ msg: 'Trajet non trouvé' });
    }

    // Créer la propriété passengers si elle n'existe pas encore
    if (!trajet.passengers) trajet.passengers = [];

    // Vérifier si l'utilisateur a déjà rejoint
    const alreadyJoined = trajet.passengers.some(p => p.toString() === userId);
    if (alreadyJoined) {
      return res.status(400).json({ msg: 'Utilisateur déjà inscrit à ce trajet' });
    }

    // Vérifier qu'il reste des places
    if (trajet.passengers.length >= trajet.places) {
      return res.status(400).json({ msg: 'Plus de places disponibles pour ce trajet' });
    }

    // Ajouter l'utilisateur aux passagers
    trajet.passengers.push(userId);
    await trajet.save();

    return res.status(200).json({ msg: 'Inscription réussie', trajet });
  } catch (err) {
    console.error('Erreur serveur (join):', err);
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
});

router.post('/:id/unjoin', async (req, res) => {
  const { userId } = req.body;
  const trajetId = req.params.id;

  try {
    const trajet = await Trajet.findById(trajetId);
    if (!trajet) return res.status(404).json({ msg: 'Trajet non trouvé' });

    trajet.passengers = trajet.passengers.filter(p => p.toString() !== userId);
    await trajet.save();

    return res.status(200).json({ msg: 'Désinscription réussie', trajet });
  } catch (err) {
    console.error('Erreur serveur (unjoin):', err);
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
