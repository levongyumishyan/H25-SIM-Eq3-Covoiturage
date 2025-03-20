import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import UserModel from './models/User.js';

import usersRoutes from './routes/users.js';
import bodyParser from 'body-parser';

const corsOption = 
{
    origin: ['http://localhost:8001'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

var app = express()

app.use(express.json())
app.use(cors(corsOption))

mongoose.connect("mongodb://localhost:27017/crud")


app.use('/users', usersRoutes);

app.get("/users", (req,res) =>
{
    /*
    UserModel.find({}).then(function(users)
    {
    res.json(users)
    }).catch(function(err)
    {
        console.log(err)
    })
    */
})

app.post("/users", async (req, res) =>
{
    /*
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
    */
})

app.listen(8001, () =>
{
    console.log("server is running")
})
