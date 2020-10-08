const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const AdminQuestion = require('../models/adminquestion');
const TestResult = require('../models/testresult');

router.get('/',  (req, res) => {
    AdminQuestion.find({}, (err, question) => {
        User.find({}, (err, user) => {
            TestResult.find({}, (err, result) => {
                res.render('admindashboard', {
                    adminquestion: question,
                    question: question,
                    user: user,
                    user: req.user,
                    result: result
                })
            })
        })
    })
})

//get question route
router.get('/question', (req, res) => {
    res.render('adminquestion')
})

//set question
router.post('/question', (req, res) => {
    let adminquestion = new AdminQuestion();
    adminquestion.question = req.body.question;
    adminquestion.opt1 = req.body.opt1;
    adminquestion.opt2 = req.body.opt2;
    adminquestion.opt3 = req.body.opt3;
    adminquestion.opt4 = req.body.opt4;
    adminquestion.instruction = req.body.instruction;
    adminquestion.time = req.body.time;
    adminquestion.title = req.body.title;


    adminquestion.save().then(user => {
        req.flash('success_msg', 'question sent successfully')
        res.redirect('/admin/question')
    }).catch(err => {
        console.log(err)
    });

});

//load edit form
router.get('/edit/:id', /*ensureAuthenticated,*/ function (req, res) {
    User.find({}, (err, user) => {
        AdminQuestion.findById(req.params.id, (err, question) => {
            res.render('edit_question', {
                question: question,
                user: user
            });
        })
    })
});

//update single question post route
router.post('/edit/:id', (req, res) => {
    let adminquestion = {};
    adminquestion.question = req.body.question;
    adminquestion.opt1 = req.body.opt1;
    adminquestion.opt2 = req.body.opt2;
    adminquestion.opt3 = req.body.opt3;
    adminquestion.opt4 = req.body.opt4;

    let query = { _id: req.params.id }

    AdminQuestion.updateOne(query, adminquestion, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success_msg', 'question updated successfully')
            res.redirect('/admin');
        }
    })
});

//delete single question
router.delete('/:id', async (req, res) => {
    try {
        await AdminQuestion.deleteOne({ _id: req.params.id })
        res.redirect('/admin')
    } catch (err) {
        console.error(err)
        return res.send('error/500')
    }
});

//get single question
router.get('/:id', (req, res) => {
    AdminQuestion.findById(req.params.id, (err, question) => {
        res.render('singlequestion', {
            question: question,
        })
    })
});

module.exports = router;