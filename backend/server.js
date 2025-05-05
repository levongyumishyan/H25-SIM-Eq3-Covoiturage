/**
 * Point d'entrée principal de l'application.
 * 
 * Configure et démarre un serveur Express, se connecte à MongoDB via Mongoose,
 * et expose les routes API pour l'authentification et les trajets.
 * 
 * Dépendances utilisées :
 * - dotenv : pour charger les variables d'environnement
 * - express : framework HTTP
 * - mongoose : ODM MongoDB
 * - cors : middleware pour autoriser les requêtes cross-origin
 * 
 * Routes :
 * - /api/auth : gestion de l'authentification
 * - /api/trajets : gestion des trajets
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import des routes
const authRoutes = require("./routes/auth");
const trajetRoutes = require('./routes/trajet'); 

// Définition des routes
app.use('/api/trajets', trajetRoutes);         
app.use("/api/auth", authRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB est connecté"))
  .catch(err => console.error("Erreur MongoDB:", err));

// Route de test par défaut
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Lancement du serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server marche sur le port : ${PORT}`));