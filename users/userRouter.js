const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const userMiddleware = require("./userMiddleware");

const router = express.Router();
router.use("/:id", userMiddleware.validateUserId);

router.post('/', userMiddleware.validateUser, (req, res, next) => {
  // do your magic!
  userDb.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(() => next({ code: 500, message: "There was an error creating the user" }));
});

router.post('/:id/posts', userMiddleware.validatePost, (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  const newPost = req.body;
  newPost.user_id = id;

  postDb.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => next({ code: 500, message: "Error creating a new post" }));
});

router.get('/', (req, res, next) => {
  // do your magic!
  userDb.get()
    .then(users => res.json(users))
    .catch(() => next({ code: 500, message: "There was an error retrieving users." }));
});

router.get('/:id', (req, res) => {
  // do your magic!
  res.json(req.user);
});

router.get('/:id/posts', (req, res, next) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(() => next({ code: 500, message: "Error retrieving the user's posts" }));
});

router.delete('/:id', (req, res, next) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(removedCount => {
      res.status(204).json({ removed: removedCount });
    })
    .catch(() => next({ code: 500, message: "There was an error removing the user." }));
});

router.put('/:id', userMiddleware.validateUser, (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  changes.id = id;

  userDb.update(id, changes)
    .then(updatedCount => {
        res.status(200).json(updatedCount);
    })
    .catch(() => next({ code: 500, message: "There was an error updating the user data" }));
});



module.exports = router;
