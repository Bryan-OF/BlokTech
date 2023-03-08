// how does require work?
// https://javascript.plainenglish.io/how-do-nodejs-require-and-module-work-545ab4fe5423
const express = require('express');
// https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/profile', (req, res) => res.json({ name: 'Tim Damen' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));