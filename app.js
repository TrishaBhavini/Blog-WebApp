const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Route - View Posts
app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

// Compose Route - New Post Form
app.get("/compose", (req, res) => {
  res.render("compose");
});

// Post Request - Create New Post
app.post("/compose", (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.redirect("/");
});

// Edit Post
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
