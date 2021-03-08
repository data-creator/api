let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let teacher = require("./routes/teacherController");
let user = require("./routes/user");
let subject = require("./routes/subject");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var cors = require('cors');


const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        let filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});


const uri =
    "mongodb+srv://admin:root@cluster0.w0n85.mongodb.net/tpdevoir?retryWrites=true&w=majority";

const uri2 = "mongodb://localhost:27017/assignments";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.connect(uri, options).then(
    () => {
        console.log("Connecté à la base MongoDB assignments dans le cloud !");
        console.log("at URI = " + uri);
        console.log(
            "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
        );
    },
    (err) => {
        console.log("Erreur de connexion: ", err);
    }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/public/images', express.static('./public/images'));


let port = process.env.PORT || 8010;

// les routes avec le router du module express
const prefix = "/api";

app.route(prefix + "/assignments").get(assignment.getAssignments);
app.route(prefix + "/user/register").post(user.register);
app.route(prefix + "/user/login").post(user.loginUser);

app
    .route(prefix + "/assignments/:id")
    .get(assignment.getAssignment)
    .delete(assignment.deleteAssignment);

app
    .route(prefix + "/assignments")
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);


/*------------------teacher--------------------------------------*/
app
    .route(prefix + "/teachers")
    .get(teacher.getTeachers)
    .post(upload.single('imageUrl'), teacher.postTeacher);

/*------------------------------subjects --------------------------*/

app
    .route(prefix + "/subjects")
    .get(subject.getSubjects)
    .put(upload.fields([{
        name: 'subjectImage', maxCount: 1
    }, {
        name: 'teacherImage', maxCount: 1
    }]),subject.updateSubject)
    .post(upload.fields([{
        name: 'subjectImage', maxCount: 1
    }, {
        name: 'teacherImage', maxCount: 1
    }]), subject.postSubject);


app
    .route(prefix + "/subjects/:id")
    .get(subject.getSubject)
    .put(subject.updateSubject)
    .delete(subject.deleteSubject);



// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);


module.exports = app;
