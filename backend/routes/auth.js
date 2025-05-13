const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Utilisateur = require("../models/Utilisateur");
const Voiture = require("../models/Voiture");
const { verifierMotDePasse } = require("../utils/validation");
const Trajet = require("../models/Trajet");
require("dotenv").config();

const router = express.Router();



// --- SIGNUP ---
router.post("/signup", [
  body("nom").notEmpty().withMessage("Nom est requis"),
  body("email").isEmail().withMessage("Email invalide"),
  body("mdp").notEmpty().withMessage("Mot de passe requis")
], async (req, res) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

  const { mdp } = req.body;
  const erreursMdp = verifierMotDePasse(mdp); //Vérifie selon les éléments requis à sa création
  if (erreursMdp.length > 0) {
    return res.status(400).json({ errors: erreursMdp.map(msg => ({ msg })) });
  }

  const { prenom, nom, dateNaissance, telephone, email, conducteur, passager, modeleVoiture, anneeVoiture, consommationVoiture } = req.body;

  try {
    let utilisateur = await Utilisateur.findOne({ email: email.toLowerCase() });
    if (utilisateur) return res.status(400).json({ msg: "Cet utilisateur est déjà existant" });

    const salt = await bcrypt.genSalt(10);
    const mdpHash = await bcrypt.hash(mdp, salt); //Encryption du mot de passe avec son grain de sel (c'est juste mixé avec un string aléatoire qui va améliorer la sécurité)

    //Crée un voiture pour l'utilisateur s'il est conducteur
    let voiture;
    if (conducteur === true) {
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
    res.json({ token, user: { id: utilisateur._id, nom, prenom, email, voiture } });
    console.log("Nouvel utilisateur créé:" + email)
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur ou une information est manquante" });
  }
});



// --- LOGIN ---
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

    await Utilisateur.updateOne({ email }, { $set: { estConnecte: true } });

    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        telephone: utilisateur.telephone,
        email: utilisateur.email,
        estConnecte: true,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur server" });
  }
});

// --- LOGOUT  ---
router.post("/logout", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email manquant." });

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) return res.status(404).json({ msg: "Utilisateur introuvable." });

    await Utilisateur.updateOne({ email }, { $set: { estConnecte: false } });
    console.log(`Utilisateur déconnecté : ${email}`);
    return res.status(200).json({ msg: "Déconnexion réussie." });
  } catch (err) {
    console.error("Erreur serveur lors de la déconnexion:", err);
    return res.status(500).json({ msg: "Erreur server" });
  }
});

// --- UPDATE USER INFOS ---
router.post("/updateUserInfos", [
  body("nom").notEmpty().withMessage("Nom est requis"),
  body("email").isEmail().withMessage("Email invalide"),
], async (req, res) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });

  const { id, prenom, nom, telephone, email } = req.body;

  try {
    const utilisateur = await Utilisateur.findById(id);
    if (!utilisateur) return res.status(404).json({ msg: "Utilisateur introuvable" });

    utilisateur.nom = nom;
    utilisateur.prenom = prenom;
    utilisateur.telephone = telephone;
    utilisateur.email = email;

    await utilisateur.save();
    console.log(`Infos mises à jour pour l'utilisateur ${email}`);
    res.json({ msg: "Informations mises à jour." });
  } catch (err) {
    console.error("Erreur mise à jour utilisateur:", err);
    res.status(500).json({ msg: "Erreur server" });
  }
});

router.get("/ping", (req, res) => {
  res.send("Pong!");
});

module.exports = router;
