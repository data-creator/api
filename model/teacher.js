let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Teacher = new mongoose.Schema({

    id: Number,
    teacherName: String,
    imageUrl: String,
});

Teacher.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Teacher", Teacher);
