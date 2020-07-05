var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/auth.middleware')

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
});


router.get('/dashboard', ensureAuth, (req, res) => {
    // console.log(req.user.id);
    //req.user.id hay req.user._id cũng đc
    console.log('cookie ne', req.session.cookie);
    console.log('sessionID ne', req.sessionID);
    

    res.render('dashboard', req.user);
});




module.exports = router;
