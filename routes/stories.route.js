const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureAuth } = require('../middlewares/auth.middleware')
const Story = require('../models/Story')
const { route } = require('./index.route')
//  route stories/add
router.get('/add',(req, res) => {
    return res.render('stories/add')
});


//route POST /storiees:
router.post('/', ensureAuth,async (req, res) => {
    try {
        console.log('req.body nè',req.body);
        
        req.body.user = req.user._id
        await Story.create(req.body);
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
});

//stories render index
router.get('/',(req,res)=>{
   Story.find({status:'public'})
   .populate('user')
   .sort({createdAt:'desc'})
   .then((data)=>{
    //    res.render('stories/index',{stories:data})
    console.log('stories public nè',data);
    
   })
   .catch(err=>console.error(err))
})


//get all stories:
router.get('/all', (req, res) => {
    Story.find().populate('user').exec().then((data)=>{
        res.json(data)
    })
    .catch(err=>console.log(err))
});

module.exports = router
