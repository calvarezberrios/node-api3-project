const express = require('express');
const cors = require("cors");
const path = require("path");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(cors());
server.use(express.json());

server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/api", (req, res) => {
  res.send(`<h1>Users Api running successfully!</h1>`);
});

server.use(express.static(path.join(__dirname, "client/build")));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
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

// Error Handler
server.use((err, req, res, next) => {
  res.status(err.code).json(err);
});

module.exports = server;

