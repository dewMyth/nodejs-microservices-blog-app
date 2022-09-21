const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post("/posts/:postId/comments", (req, res) => {
  const commentId = Math.floor(Math.random() * 10000);
  const { content } = req.body;

  const comments = commentsByPostId[req.params.postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.postId] = comments;

  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
