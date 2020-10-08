const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const TestResult = require('../models/testresult');

//login page
router.get('/login', (req, res) => res.render('login')); 
 
//register page
router.get('/register', (req, res) => res.render('register'));

//register handle
router.post('/register', (req, res) => {
    const { firstname, lastname, email, password, password2, isAdmin } = req.body;
    let errors = [];

    //check require field
    if (!firstname || !lastname || !email || !password || !password2 || !isAdmin ) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //check passwors match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match, try again' });
    }

    //check passwords length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be atleast six characters' });
    }

    var newUser = new User({firstname: req.body.firstname});
    if(req.body.admincode === 'secretcode123') {
        newUser.isAdmin = true;
    }


    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname,
            email,
            password,
            password2,
            isAdmin
        });
    } else {
        //validation pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exist
                    errors.push({ msg: ' Email already exist, try with a different email' })
                    res.render('register', {
                        errors,
                        firstname,
                        lastname,
                        email,
                        password,
                        password2,
                        isAdmin
                    });
                } else {
                    const newUser = new User({
                        firstname,
                        lastname,
                        email,
                        password,
                        isAdmin
                    });
                    //hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success_msg', 'registered')
                                res.redirect('/users/login')
                            }).catch(err => {
                                console.log(err)
                            });
                        })
                    })
                }
            });
    }
});

//load edit user form
router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    res.render('edit_user');
});

//update user profile post route
router.put('/edit/:id', async (req, res) => {
    try {
        let userProfile = await User.findById(req.params.id).lean() 

        if (!userProfile) {
            return res.send('error/404')
        }
        userProfile = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidations: true
        })

        res.redirect('/users/profile/:id')
    } catch (err) {
        console.error(err)
        return res.send('error/500') 
    }
});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Admin login handle
router.post('/admin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admindashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'loggout');
    res.redirect('/');
})


//profile page
router.get('/profile/:id', ensureAuthenticated, (req, res) => {
    TestResult.find({}, (err, result) => {
        res.render('profile', {
            user: req.user,
            result: result
        })
    })
});



module.exports = router;