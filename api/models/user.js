const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    courriel: String,
    mdp: String
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;