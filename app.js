const createError = require('http-errors');
const express = require('express');
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_HOST || process.exit(-1),
  // Port don't work so good w/ Azure port: process.env.DB_PORT || process.exit(-1),
  database: process.env.DB_DATABASE || process.exit(-1),
  user: process.env.DB_USER || process.exit(-1),
  password: process.env.DB_PASSWORD || process.exit(-1),
  ssl: {rejectUnauthorized: false},
});

const app = express();
const router = express.Router();
app.use(express.json());

router.get('/', readHelloMessage);
router.get('/players', readPlayers);
router.get('/players/:id', readPlayer);
router.put('/players/:id', updatePlayer);
router.post('/players', createPlayer);
router.delete('/players/:id', deletePlayer);
router.get("/games", readGames);
router.get("/hotels", readHotels);

app.use(router);

// New Stuff for homework 3

function readGames(req, res, next) {
  db.many("SELECT * FROM playergame, game, player WHERE gameid = game.id AND playerid = player.id;")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

function readHotels(req, res, next) {
  db.many("SELECT * FROM playergamehotels, propertylocation WHERE propertyname = hotellocation;")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

// Implement the CRUD operations.
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send('Hello, CS 262 Monopoly service!');
}

function readPlayers(req, res, next) {
  db.many('SELECT * FROM player')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readPlayer(req, res, next) {
  db.oneOrNone('SELECT * FROM Player WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function updatePlayer(req, res, next) {
  db.oneOrNone('UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createPlayer(req, res, next) {
  db.one('INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deletePlayer(req, res, next) {
  db.oneOrNone('DELETE FROM Player WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = app;
