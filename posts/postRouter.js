const express = require('express');
const postDb = require("./postDb");

// custom middleware
const postMiddleware = require("./postMiddleware");
const { validatePost } = require('../users/userMiddleware');

const router = express.Router();

router.use("/:id", postMiddleware.validatePostId);

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(() => res.status(500).json({ message: "There was an error retrieving the posts data" }));
});

router.get('/:id', (req, res) => {
  // do your magic!
  res.send(req.post)
});

router.delete('/:id', (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
    .then(removedCount => {
      res.status(204).json(removedCount);
    })
    .catch(() => res.status(500).json({ message: "There was an error removing the post data" }));
});

router.put('/:id', validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  changes.id = id;

  postDb.update(id, changes)
    .then(updatedCount => {
      res.status(200).json(updatedCount);
    })
    .catch(() => res.status(500).json({ message: "There was an error updating the post data" }));
});

module.exports = router;
