let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({

    id: Number,
    fullName: String,
    username: String,
    password: String
});


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("UserSchema", UserSchema);
