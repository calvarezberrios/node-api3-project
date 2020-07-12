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
                res.status(400).json({ message: "invalid post id" });
            }
        })
        .catch(() => res.status(500).json({ message: "Error getting post data" }));
}

module.exports = {
    validatePostId
}