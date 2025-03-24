const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors');

// middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://nom_utilisateur:mot_de_passe@ridew.xta2m.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

app.listen(port, () => {
    console.log("Server is running on port 8000");
})

const UserSchema = new mongoose.Schema({
    courriel: String,
    mdp: String
})

const User = mongoose.model("user", UserSchema)

// CRUD
app.get("/user/register", async(req,res) => {

    try 
    {
        const users = await User.find();
        res.json(users);
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
    
})
app.post("/user/register" , async(req,res) => {

    try 
    {
        const newUser = new User(req.body)
        await newTodo.save()
        res.status(201).json(newUser)
    }
    catch (error)
    {
        res.status(400).json({message: error.message})
    }
    
})
app.put("/user/register" , async(req,res) => {

    try 
    {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.json(updatedUser)
    }
    catch (error)
    {
        res.status(400).json({message: error.message})
    }
    
})
app.delete("/user/register", async(req,res) => {

    try 
    {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: "User deleted"})
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
    
})


