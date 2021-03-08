let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = new mongoose.Schema({
    student: String,
    teacher: String,
    subject: String,
    id: Number,
    assignmentTitle: String,
    date: Date,
    isComplete: Boolean,
    assignmentMark: String,
    subjectImageUrl: String,
    teacherImageUrl: String,
    remark: String
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Assignment", AssignmentSchema);
