// how does require work?
// https://javascript.plainenglish.io/how-do-nodejs-require-and-module-work-545ab4fe5423
const express = require("express");
// https://expressjs.com/en/resources/middleware/cors.html
const cors = require("cors");
const multer = require("multer");
var ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Settings and middleware (Middleware are software and cloud services)
const upload = multer();
const app = express();

// Fix to stop nodemon form crashing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("static"));
app.set("view engine", "ejs");

const port = 8080;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);



// Array of games (collection of games)
let username, games;

games = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
];



// Endpoint to remove likes (this is to unlike)
// Route parameter: :likeId, :userId
app.post("/unlike", async (req, res) => {
  const likeId = req.body.likeId;
  const userId = req.body.userId;

  // oude code
  // app.get('/unlike/:likeId/:userId', async (req, res) => {
  //   const likeId = req.params.likeId;
  //   const userId = req.params.userId;

  try {
    await client.connect();
    const db = client.db("gameTogether-db");
    const result = await db
      .collection("likes")
      .deleteOne({ _id: new ObjectId(likeId) });

    if (result.deletedCount === 1) {
      res.status(200).send("Success");
    } else {
      res.status(404).send("Like not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  } finally {
    await client.close();
  }
});



// oude code
// // Endpoint to get all the likes
// app.get('/likes', async (req, res) => {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("gameTogether-db");
//     db.collection("likes").find().toArray((err, likes) => {
//       if (err) throw err;
//       res.json(likes);
//       client.close();
//     });
//     const likesCollection = db.collection("likes");

//     // find code goes here
//     const allLikes = likesCollection.find().toArray();

//     res.json(await allLikes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// // Endpoint to get all the likes
// app.get('/unlike/:likeId/:userId', async (req, res) => {
//   const likeId = req.params.likeId;
//   const userId = req.params.userId;

//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("gameTogether-db");
//     db.collection("likes").deleteOne( { "_id" : new ObjectId(likeId) } );

//     res.status(200).send('Succes');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });



// Endpoint to add like (this is to like)
// Route parameter: :gameId, :userId
app.post("/like", async (req, res) => {
  const gameId = req.body.gameId;
  const userId = req.body.userId;

  // oude code
  // app.get('/like/:gameId/:userId', async (req, res) => {
  //   const gameId = req.params.gameId;
  //   const userId = req.params.userId;

  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("gameTogether-db");

    const allLikes = db
      .collection("likes")
      .find({ userId: Number(userId) })
      .toArray();
      // checks if the game is already liked
    if ((await allLikes).some((like) => like.gameId === Number(gameId))) {
      throw "already liked";
    }

    // add like to database
    db.collection("likes").insertOne(
      { gameId: Number(gameId), userId: Number(userId) },
      // if error happens
      function (err, res) {
        if (err) throw err;
        db.close();
      }
    );

    res.status(201).send("succes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Feature to retrieve likes from a user based on their Id
async function getUserLikesById(id) {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("gameTogether-db");
    const likesCollection = db.collection("likes");

    // makes user array into number
    const allLikes = likesCollection.find({ userId: Number(id) }).toArray();

    console.log(await allLikes);
    // sends funtion back
    return await allLikes;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}



// Profile route with user ID as parameter
app.get("/profile/:userId", async (req, res) => {
  res.render("profile", {
    likes: await getUserLikesById(req.params.userId),
    userId: req.params.userId,
  });
});

// Home route for multible users
// render page for each user without login
app.get("/home", async (req, res) => {
  res.render("index", { userId: 2, games: games });
});


// routes not used in project
// Route to update the username
// app.post("/update-username", upload.none(), function (req, res, next) {
//   username = req.body.name;
//   res.redirect("/");
// });

// Route to remove the username
// we use get here because HTML5 does not allow delete methodes to be used in a form.
// app.get("/delete-username", upload.none(), function (req, res, next) {
//   username = null;
//   res.redirect("/");
// });

// Route to retrieve the current username
// app.get("/username", (req, res) => res.json({ name: username }));

// Route for handling invalid routes.
app.all("*", (req, res) => {
  res.render("error");
});

// Start the server on the specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));