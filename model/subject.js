let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Subject = new mongoose.Schema({

    id: Number,
    subjectName: String,
    imageUrl: String,
    teacherName: String,
    teacherImageUrl:String
});

Subject.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Subject", Subject);
