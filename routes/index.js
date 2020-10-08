const express = require('express');
const { ensureAuthenticated, isAdmin } = require('../config/auth');
const router = express.Router();
const User = require('../models/User')
const AdminQuestion = require('../models/adminquestion');
const TestResult = require('../models/testresult');

//welcome page
router.get('/',   (req,res) => {
    // User.find({}, (err, user)=>{
        res.render('welcome',{
            user:req.user,
            // admin:user.isAdmin
        })
    // })
});

//test page
router.get('/test', ensureAuthenticated, (req,res) =>{
    AdminQuestion.find({}, (err, question)=>{
        res.render('quiz',{
            name: req.user.name,
            adminquestion: question
        })
    })
})

//save test result
router.post('/test', ensureAuthenticated, (req, res) => {
    let result = new TestResult();
    result.testResultPercent = req.body.testResultPercent;
    result.testResultScore = req.body.testResultScore;
    result.user = req.body.user;
    result.title =req.body.title;
    result.name =req.body.name;

    result.save().then(user => {
        req.flash('success_msg', 'Congratulations, your test was successful')
        res.redirect('/users/profile/:id')
    }).catch(err => {
        console.log(err)
    });

});

module.exports = router;