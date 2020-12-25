const express = require('express');
const postDb = require("./postDb");
const postMiddleware = require("./postMiddleware");
const userMiddleware = require("../users/userMiddleware");

const router = express.Router();

router.use("/:id", postMiddleware.validatePostId);

router.get('/', (req, res, next) => {
  // do your magic!
  postDb.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(() => next({ code: 500, message: "There was an error retrieving the posts data" }));
});

router.get('/:id', (req, res) => {
  // do your magic!
  res.send(req.post)
});

router.delete('/:id', (req, res, next) => {
  // do your magic!
  postDb.remove(req.params.id)
    .then(removedCount => {
      res.status(204).json(removedCount);
    })
    .catch(() => next({ code: 500, message: "There was an error removing the post data" }));
});

router.put('/:id', userMiddleware.validatePost, (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  changes.id = id;

  postDb.update(id, changes)
    .then(updatedCount => {
      res.status(200).json(updatedCount);
    })
    .catch(() => next({ code: 500, message: "There was an error updating the post data" }));
});


module.exports = router;
