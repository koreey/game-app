const express = require('express');
const router = express.Router();

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/videogame'

// GET /unicorns (index functionality) UN-PROTECTED - all users can access
router.get('/', (req, res) => {
  const videoGames = req.user.videoGames
  res.render('videoGames/index.ejs' , {title: "Video Games", videoGames}) ;
});

// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.send('Add a video game');
});



module.exports = router;