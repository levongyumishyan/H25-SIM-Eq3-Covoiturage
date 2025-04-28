require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON data
app.use(cors()); // Allow frontend to communicate with backend

// Import your routes
const authRoutes = require("./routes/auth");
const trajetRoutes = require("./routes/trajet"); // <-- ✅ Add this

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/trajets", trajetRoutes); // <-- ✅ Mount the trajet routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB est connecté"))
.catch(err => console.error(err));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server marche sur le port : ${PORT}`));
