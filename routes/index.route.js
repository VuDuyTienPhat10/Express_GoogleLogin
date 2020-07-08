var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/auth.middleware')
//import story model:
const Story = require('../models/Story')
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
});


router.get('/dashboard', ensureAuth, async (req, res) => {
    //req.user.id hay req.user._id cũng đc
    // console.log(req.user.id);
    console.log('cookie ne', req.session.cookie);
    console.log('sessionID ne', req.sessionID);
  
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }



 
});




module.exports = router;
