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
                res.status(400).json({ message: "invalid user id" });
            }
        })
        .catch(() => res.status(500).json({ message: "Error getting user data" }));
}

function validateUser(req, res, next) {
    // do your magic!
    if(!req.body) {
        res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    // do your magic!
    if(!req.body) {
        res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}