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
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const trajetRoutes = require("./routes/trajet");

app.use("/api/auth", authRoutes);
app.use("/api/trajets", trajetRoutes);

app.get("/", (req, res) => res.send("API is running"));

// CONNEXION DE MONGODB ATLAS
// IMPORTANT : Pour que le serveur se connecte à MongoDB Atlas, il est
// important d'avoir le fichier ".env" dans le dossier principal avec
// toutes les variables d'environnement requises. Si le fichier ".env" est absent, 
// veuillez consulter le README.md pour les instructions.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB est connecté"))
  .catch((err) => console.error("Erreur MongoDB:", err));

const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server marche sur le port : ${PORT}`));
