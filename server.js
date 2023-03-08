// how does require work?
// https://javascript.plainenglish.io/how-do-nodejs-require-and-module-work-545ab4fe5423
const express = require("express");
// https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");
const multer  = require('multer');

const upload = multer();
const app = express();
const port = 8080;

let username;

app.use(cors());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { username: username });
});

app.post('/update-username', upload.none(), function (req, res, next) {
  username = req.body.name;
  console.log(username);
  res.redirect("/")
});

// we use get here because HTML5 does not allow delete methodes to be used in a form.
app.get('/delete-username', upload.none(), function (req, res, next) {
  username = null;
  res.redirect("/")
});

app.get("/username", (req, res) => res.json({ name: username }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
