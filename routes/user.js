let Assignment = require("../model/assignment");
let User = require("../model/user");


function loginUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username, password: password}, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json(assignment);
    });
}

function register(req, res) {

    let user = new User();
    user.fullName = req.body.fullName;
    user.username = req.body.username;
    user.password = req.body.password;

    console.log("POST user reçu :");
    console.log(user);

    user.save((err) => {
        if (err) {
            res.send("cant post assignment ", err);
        }
        res.json({message: `${user.fullName} register!`});
    });
}


module.exports = {
    loginUser,
    register,
};
