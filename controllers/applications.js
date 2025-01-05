const express = require('express');
const User = require('../models/user.js');
const router = express.Router();


// GET /unicorns (index functionality) UN-PROTECTED - all users can access
router.get('/', (req, res) => {
  const applications = req.user.applications;
  res.render('applications/index.ejs' , { applications, title: 'Video Game List'});
});
const ensureSignedIn = require('../middleware/ensure-signed-in');
// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.send('Add a video game');
});



module.exports = router;