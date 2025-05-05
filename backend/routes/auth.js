/**
 * Module de gestion des utilisateurs et des trajets.
 * Ce module permet de gérer l'inscription, la connexion, la déconnexion,
 * la mise à jour des informations utilisateur et la gestion des trajets.
 *
 * @module routes
 */

const express = require("express"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const { body, validationResult } = require("express-validator"); 
const Utilisateur = require("../models/Utilisateur");
const Voiture = require("../models/Voiture"); 
const { verifierMotDePasse } = require("../utils/validation");
require("dotenv").config();
const Trajet = require("../models/Trajet");

const router = express.Router();

/**
 * Route pour l'inscription d'un utilisateur.
 * Valide les données envoyées et enregistre un utilisateur dans la base de données,
 * en générant un hash pour le mot de passe et un token JWT.
 *
 * @route POST /signup
 * @param {string} nom - Le nom de l'utilisateur.
 * @param {string} prenom - Le prénom de l'utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} mdp - Le mot de passe de l'utilisateur.
 * @param {string} dateNaissance - La date de naissance de l'utilisateur.
 * @param {string} telephone - Le numéro de téléphone de l'utilisateur.
 * @param {boolean} conducteur - Si l'utilisateur est conducteur ou passager.
 * @param {boolean} passager - Si l'utilisateur est passager ou conducteur.
 * @param {string} modeleVoiture - Le modèle de la voiture du conducteur.
 * @param {string} anneeVoiture - L'année du modèle de voiture.
 * @param {string} consommationVoiture - La consommation de carburant de la voiture.
 *
 * @returns {Object} - L'objet utilisateur avec un token JWT.
 */
router.post("/signup", [
    body("nom").notEmpty().withMessage("Nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),
    body("mdp").notEmpty().withMessage("Mot de passe requis")
], async (req, res) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

    const { mdp } = req.body;
    const erreursMdp = verifierMotDePasse(mdp);
    if (erreursMdp.length > 0) {
        return res.status(400).json({ errors: erreursMdp.map(msg => ({ msg })) });
    }

    const { prenom, nom, dateNaissance, telephone, email, conducteur, passager, modeleVoiture, anneeVoiture, consommationVoiture } = req.body;
    try {
        let utilisateur = await Utilisateur.findOne({ email: email.toLowerCase() });
        if (utilisateur) return res.status(400).json({ msg: "Cet utilisateur est déjà existant" });

        const seed = await bcrypt.genSalt(10);
        const mdpHash = await bcrypt.hash(mdp, seed);
        
        let voiture;
        if (conducteur == true) {
            voiture = new Voiture({
                modeleVoiture,
                anneeVoiture,
                consommationVoiture
            });
            await voiture.save();
        }

        utilisateur = new Utilisateur({
            prenom,
            nom,
            dateNaissance,
            telephone,
            email,
            mdp: mdpHash,
            conducteur,
            passager,
            estConnecte: true,
            voiture
        });
        await utilisateur.save();

        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: utilisateur._id, nom, prenom, email, voiture} });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err });
    }
});

/**
 * Route pour la connexion d'un utilisateur.
 * Vérifie les informations d'identification de l'utilisateur, et génère un token JWT s'il est valide.
 *
 * @route POST /login
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} mdp - Le mot de passe de l'utilisateur.
 *
 * @returns {Object} - L'objet utilisateur avec un token JWT.
 */
router.post("/login", [
    body("email").isEmail().withMessage("Email invalide"),
    body("mdp").exists().withMessage("Mot de passe requis")
], async (req, res) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

    const email = req.body.email.toLowerCase();
    const { mdp } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) return res.status(400).json({ msg: "Email introuvable" });

        const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);
        if (!isMatch) return res.status(400).json({ msg: "Email ou mot de passe invalide" });

        await Utilisateur.updateOne({ email: email }, { $set: { estConnecte: true } });

        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, utilisateur: { id: utilisateur._id, nom: utilisateur.nom, estConnecte: true, prenom: utilisateur.prenom, telephone: utilisateur.telephone, email: utilisateur.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur server" });
    }
});

/**
 * Route pour la déconnexion d'un utilisateur.
 * Déconnecte un utilisateur en mettant à jour son statut de connexion.
 *
 * @route POST /logout
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} mdp - Le mot de passe de l'utilisateur.
 *
 * @returns {Object} - L'objet utilisateur mis à jour avec le statut de connexion.
 */
router.post("/logout", [], async (req, res) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

    const { email, mdp } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) return res.status(400).json({ msg: "Email introuvable" });

        const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);
        if (!isMatch) return res.status(400).json({ msg: "Email ou mot de passe invalide" });

        await Utilisateur.updateOne({ email: email }, { $set: { estConnecte: false } });

        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, utilisateur: { id: utilisateur._id, nom: utilisateur.nom, estConnecte: false } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur server" });
    }
});

// TODO: Route pour gérer les trajets
router.post("/trajet", [], async (req, res) => {
    const { id, long, lat, targetLong, targetLat } = req.body;
    try {
        const trajet = await Trajet.findOne({ id, long, lat, targetLong, targetLat });
        await Trajet.updateOne(
            { id: id },
            { long: long, lat: lat, targetLong: targetLong, targetLat: targetLat },
        );
        res.json({ trajet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur server" });
    }
});

/**
 * Route pour mettre à jour les informations utilisateur.
 * Permet de mettre à jour le nom, téléphone et email de l'utilisateur.
 *
 * @route POST /updateUserInfos
 * @param {string} id - L'identifiant unique de l'utilisateur.
 * @param {string} nom - Le nom de l'utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} telephone - Le numéro de téléphone de l'utilisateur.
 *
 * @returns {Object} - L'utilisateur avec les informations mises à jour.
 */
router.post("/updateUserInfos", [
    body("nom").notEmpty().withMessage("Nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),
], async (req, res) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

    const { id, prenom, nom, telephone, email } = req.body;
    try {
        let utilisateur = await Utilisateur.findById(id);
        if (!utilisateur) return res.status(400).json({ msg: "Erreur utilisateur introuvable" });

        utilisateur.nom = nom;
        utilisateur.telephone = telephone;
        utilisateur.email = email;

        await utilisateur.save();
        console.log("informations mises à jour");
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err });
    }
});

module.exports = router;