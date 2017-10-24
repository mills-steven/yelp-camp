var express = require('express');
var route = express.Router();
var passport = require('passport');
var User = require('../models/user');
var mongoose = require('mongoose');
var LocallStrategy = require('passport-local');
var middleware = require('../middleware');

mongoose.Promise = global.Promise;

route.get('/', function (req, res) {
    res.render("landing");
}); 

route.get('/register', function (req, res) {
    res.render('register');
});

route.post('/register', function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', "Welcome to YelpCamp, " + user.username + "!");
            res.redirect('/campgrounds');
        });
    });
});
//login form
route.get('/login', function (req, res) {
    res.render('login');
});

route.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}));

//logout logic
route.get("/logout", function (req, res) {
    req.logout();
    req.flash('success', "Success, you've been logged you out!")
    res.redirect('/campgrounds');
});


module.exports = route;