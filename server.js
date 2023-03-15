// how does require work?
// https://javascript.plainenglish.io/how-do-nodejs-require-and-module-work-545ab4fe5423
const express = require("express");
// https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");
const multer  = require('multer');

require('dotenv').config();

const upload = multer();
const app = express();
const port = 8080;

const { MongoClient } = require("mongodb");

let username, games;

games  = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  },
  {
    id: 9
  }
];

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Define a route to get all the likes
app.get('/likes', async (req, res) => {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("gameTogether-db");
    db.collection("likes").find().toArray((err, likes) => {
      console.log(likes);
      if (err) throw err;
      res.json(likes);
      client.close();
    });
    const likesCollection = db.collection("likes");

    // find code goes here  
    const allLikes = likesCollection.find().toArray();
    
    res.json(await allLikes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/like/:gameId/:userId', async (req, res) => {
  const gameId = req.params.gameId;
  const userId = req.params.userId;

  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("gameTogether-db");

    const allLikes = db.collection("likes").find({userId: Number(userId)}).toArray();
    if ((await allLikes).some(like => like.gameId === Number(gameId))) {
      throw 'already liked';
    }

    db.collection("likes").insertOne({gameId: Number(gameId), userId: Number(userId)}, function(err, res) {
      if (err) throw err;
      db.close();
    });

    res.status(200).send('succes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

async function getUserLikesById(id) {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("gameTogether-db");
    const likesCollection = db.collection("likes");

    // find code goes here  
    const allLikes = likesCollection.find({userId: Number(id)}).toArray();
    
    console.log(await allLikes);
    return await allLikes;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.use(cors());

app.use(express.static('static'));

app.set("view engine", "ejs");

app.get("/profile/:userId", async (req, res) => {
  res.render("profile", { likes: await getUserLikesById(req.params.userId), userId: req.params.userId });
}); 

app.get("/home", async(req, res) => {
  res.render("index", { userId: 1, games: games });
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