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
 res.render('applications/show.ejs', {title: application.game , application}
 );
  }catch (e){
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
  try{
    req.body.owner = req.user._id
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      owner: req.body.owner,
    });
res.redirect('/applications');
    } catch (e){
      res.redirect('/applications');
    }
  
});



// GET/ applications/:id/edit (edit functionality/action)

router.get('/:id/edit', async(req, res) =>{
  try{
const application = await Application.findById(req.params.id);
res.render('applications/edit.ejs', {title: 'Edit Entry', application});

} catch (e) {
  res.redirect('/applications');
}
});

// PUT/ applications/:id
router.put('/:id', async (req, res) => {
  console.log(req.body)
  try{
    const application = await Application.findById(req.params.id);
      application.game = req.body.game;
      application.notes = req.body.notes;
      application.console = req.body.console;
await application.save();
res.redirect('/applications');
  } catch (e){
    res.redirect('/applications');
  }
});


module.exports = router;