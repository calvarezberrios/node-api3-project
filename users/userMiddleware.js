const userDb  = require("./userDb");

function validateUserId(req, res, next) {
    // do your magic!
    const { id } = req.params;
    userDb.getById(id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                next({ code: 400, message: "invalid user id" });
            }
        })
        .catch(() => {
            next({ code: 500, message: "Error retrieving user data" });
        });
}

function validateUser(req, res, next) {
    // do your magic!
    if(!req.body) {
        next({ code: 400, message: "missing user data" });
    } else if (!req.body.name) {
        next({ code: 400, message: "missing required name field" });
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    // do your magic!
    if(!req.body) {
        next({ code: 400, message: "missing post data" });
    } else if (!req.body.text) {
        next({ code: 400, message: "missing required text field" });
    } else {
        next();
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}