const express = require("express"); // créer le routeur et gérer les routes API
const bcrypt = require("bcryptjs"); // sert à hacher les mots de passe pour la sécurité
const jwt = require("jsonwebtoken"); // sert à génèrer un token d’authentification après la connexion ou l’inscription
const { body, validationResult } = require("express-validator"); // sert à vérifier que les entrées utilisateur sont valides
const Utilisateur = require("../models/Utilisateur");
const Voiture = require("../models/Voiture"); 
require("dotenv").config();

const router = express.Router();
const mdpTailleMin = 6;

// signup route

// validation entrées
router.post("/signup", [
    body("nom").notEmpty().withMessage("Nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),

    // ici on peut rajouter des conditions pour le mot de passe, on devrait faire une fonction
    body("mdp").isLength({ min: mdpTailleMin }).withMessage(`Mot de passe doit contenir au moins ${mdpTailleMin} caractères`)
], async (req, res) => {

    // traitement de l'inscription
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() }); // retourner erreurs

    const { prenom, nom, dateNaissance, telephone, email, mdp, conducteur, passager, modeleVoiture, anneeVoiture, consommationVoiture } = req.body;
    try {
        let utilisateur = await Utilisateur.findOne({ email });  // cherche si l'utilisateur est déjà dans la base de données
        if (utilisateur) return res.status(400).json({ msg: "Cet utilisateur est déjà existant" });  // retourner message d'erreur

        const seed = await bcrypt.genSalt(10); // random seed pour l'inscription
        const mdpHash = await bcrypt.hash(mdp, seed); // hache le mdp
        
        let voiture;
        if (conducteur == true) {
          voiture = new Voiture({
            modeleVoiture,
            anneeVoiture,
            consommationVoiture
          });
          await voiture.save();
          console.log("voiture créée");
        }

        // créer et enregistrer utilisateur
        // maintenant on peut l’utiliser dans Utilisateur, même s’il est undefined
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
  console.log("utilisateur créé");
        // génèrer le token JWT et le stocker
        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: utilisateur._id, nom, prenom, email, voiture} });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err});  // en cas d'erreur
    }
});

// login route
router.post("/login", [
    body("email").isEmail().withMessage("Email invalide"),
    body("mdp").exists().withMessage("Mot de passe requis")
], async (req, res) => {

    // traitement de la connexion
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });  // retourner erreurs

    const { email, mdp } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) return res.status(400).json({ msg: "Email introuvable" });
        const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);
        if (!isMatch) return res.status(400).json({ msg: "Email ou mot de passe invalide" });
        await Utilisateur.updateOne(
            { email: email }, 
            { $set: { estConnecte: true } }
          );
        // génère le token JWT et le stocker
        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, utilisateur: { id: utilisateur._id, nom: utilisateur.nom, estConnecte: !utilisateur.estConnecte } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur server" });
    }
});
router.post("/logout",[], async (req, res) => {

    // traitement de la connexion
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) return res.status(400).json({ errors: erreurs.array() });  // retourner erreurs

    const { email, mdp } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) return res.status(400).json({ msg: "Email introuvable" });
        const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);
        if (!isMatch) return res.status(400).json({ msg: "Email ou mot de passe invalide" });
        await Utilisateur.updateOne(
            { email: email }, 
            { $set: { estConnecte: false } }
          );
        // génère le token JWT et le stocker
        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, utilisateur: { id: utilisateur._id, nom: utilisateur.nom, estConnecte: !utilisateur.estConnecte } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur server" });
    }
});


module.exports = router;