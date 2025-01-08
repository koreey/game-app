const express = require('express');
const User = require('../models/user.js');
const router = express.Router();
const Application = require('../models/application.js');

// GET /unicorns (index functionality) UN-PROTECTED - all users can access
router.get('/', async(req, res) => {
  const applications = await Application.find();
  res.render('applications/index.ejs' , { applications, title: 'Video Game List'});
});
const ensureSignedIn = require('../middleware/ensure-signed-in');
// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('applications/new.ejs', {title: 'Add a Video-Game'})
});

// GET/ applications/:id (show functionality/ action)
router.get('/:id', async (req,res) =>{
  try{
 const application = await Application.findById(req.params.id);
 console.log(application)
 res.render('applications/show.ejs', {title: application.game , application}
 );
  }catch (e){
    console.log(e);
    res.redirect('/applications');
  }
});

// POST// applications (create functionality/action)
router.post('/', async (req, res) => {
  try{
req.body.owner = req.user._id
await Application.create(req.body)
res,redirect('/applications')
} catch (e){
  res.redirect('/applications/new');
}
});

// DELETE/ applications/:id (delete functionality/action)
router.delete('/:id', async (req, res) =>{
req.user.applications.pull(req.params.id);
await req.user.save();
res.redirect('/applications');
});

// GET/ applications/:id/edit (edit functionality/action)
router.get('/:id/edit', (req, res) =>{
const application = req.user.applications.id(req.params.id);
res.render('applications/edit.ejs', {title: 'Edit Entry', application});
})
module.exports = router;