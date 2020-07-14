const postDb = require("./postDb");

function validatePostId(req, res, next) {
    // do your magic!
    const { id } = req.params;
    postDb.getById(id)
        .then(post => {
            if(post) {
                req.post = post;
                next();
            } else {
                next({ code: 400, message: "invalid post id" });
                res.status(400).json({ message: "invalid post id" });
            }
        })
        .catch(() => next({ code: 400, message: "Error getting post data" }));
}

module.exports = {
    validatePostId
}