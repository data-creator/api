let Teacher = require("../model/teacher");

function getTeachers(req, res) {
    const aggregateQuery = Teacher.aggregate();
    Teacher.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 100,
        },
        (err, teachers) => {
            if (err) {
                res.send(err);
            }
            res.send(teachers);
        }
    );
}


function postTeacher(req, res) {

    let teacher = new Teacher();
    teacher.teacherName = req.body.teacherName;
    teacher.imageUrl = 'http://localhost:8010/public/images/' + req.file.filename;

    console.log("POST teacher reçu :");
    console.log(teacher);

    teacher.save((err) => {
        if (err) {
            res.send("cant post teacher ", err);
        }
        res.json({message: `${teacher.teacherName} saved!`});
    });
}



function deleteTeacher(req, res) {
    Teacher.findByIdAndRemove(req.params.id, (err, teacher) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${teacher.teacherName} deleted`});
    });
}

module.exports = {
    getTeachers,
    postTeacher,
    deleteTeacher,
};
