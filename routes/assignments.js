let Assignment = require("../model/assignment");
const multer = require('multer');


function getAssignments(req, res) {
    const aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 100,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }

            res.send(assignments);
        }
    );
}

function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json(assignment);
    });
}

function postAssignment(req, res) {

    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.assignmentTitle = req.body.assignmentTitle;
    assignment.date = req.body.date;
    assignment.isComplete = req.body.isComplete;
    assignment.student = req.body.student;
    assignment.teacher = req.body.teacher;
    assignment.teacherImageUrl = req.body.teacherImageUrl;
    assignment.subjectImageUrl = req.body.subjectImageUrl;


    console.log("POST assignment reçu :");
    console.log(assignment);

    assignment.save((err) => {
        if (err) {
            res.send("cant post assignment ", err);
        }
        res.json({message: `${assignment.assignmentTitle} saved!`});
    });
}

function updateAssignment(req, res) {
    console.log(req.body);
    req.body.isComplete = true;
    Assignment.findByIdAndUpdate(
        req.body._id,
        req.body,
        {new: true},
        (err, assignment) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json({message: "updated"});
            }

        }
    );
}

function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    });
}

module.exports = {
    getAssignments,
    postAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment,
};
