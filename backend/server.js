require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/auth");
const trajetRoutes = require('./routes/trajet'); 

app.use('/api/trajets', trajetRoutes);         
app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB est connecté"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

// Default test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server marche sur le port : ${PORT}`));
