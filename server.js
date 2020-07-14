const express = require('express');
const cors = require("cors");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(cors());
server.use(express.json());

server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const request = {
    method: req.method,
    url: req.url,
    requested_at: new Date().toISOString()
  }
  console.log(request);
  next();
}

server.use((err, req, res, next) => {
  res.status(err.code).json(err);
});

module.exports = server;

