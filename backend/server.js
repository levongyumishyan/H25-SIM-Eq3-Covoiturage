require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON data
app.use(cors()); // Laisse le frontend communiquer avec le backend
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Connection MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB est connecté"))
.catch(err => console.error(err));

// test
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server marche sur le port : ${PORT}`)); 
