let Subject = require("../model/subject");
let fs = require('fs');


function getSubject(req, res) {
    let subjectId = req.params.id;

    Subject.findOne({_id: subjectId}, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json(assignment);
    });
}

function getSubjects(req, res) {
    const aggregateQuery = Subject.aggregate();
    Subject.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 100,
        },
        (err, subjects) => {
            if (err) {
                res.send(err);
            }
            res.send(subjects);
        }
    );
}


function postSubject(req, res) {

    let subject = new Subject();
    subject.subjectName = req.body.subjectName;
    subject.teacherName = req.body.teacherName;
    subject.imageUrl = 'http://localhost:8010/public/images/' + req.files.subjectImage[0].filename;
    subject.teacherImageUrl = 'http://localhost:8010/public/images/' + req.files.teacherImage[0].filename;

    console.log("POST subject reçu :");
    console.log(subject);

    subject.save((err) => {
        if (err) {
            res.send("cant post subject ", err);
        }
        res.json({message: `${subject.subjectName} saved!`});
    });
}


function deleteSubject(req, res) {
    Subject.findByIdAndRemove(req.params.id, (err, subject) => {
        if (err) {
            res.send(err);
        }
        var filePath = 'c:/book/discovery.docx';
        res.json({message: `${subject.subjectName} deleted`});
    });
}


function updateSubject(req, res) {
    console.log(req.body);


    if (req.body.teacherImage === undefined) {
        req.body.imageUrl = req.body.teacherImageUrl;
    } else {
        req.body.teacherImageUrl = 'http://localhost:8010/public/images/' + req.files.teacherImage[0].filename;
    }

    if (req.body.subjectImage === undefined) {
        req.body.imageUrl = req.body.subjectImageUrl;
    } else {
        req.body.imageUrl = 'http://localhost:8010/public/images/' + req.files.subjectImage[0].filename;
    }

    // req.body.teacherImageUrl = 'http://localhost:8010/public/images/' + req.files.teacherImage[0].filename;


    Subject.findByIdAndUpdate(
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


module.exports = {
    getSubjects,
    postSubject,
    deleteSubject,
    getSubject,
    updateSubject
};
