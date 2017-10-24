var express = require('express');
var router = express.Router();
var moment = require('moment');
var Campground = require('../models/campground');
var middleware = require('../middleware');

router.get('/campgrounds', function (req, res) {  
    Campground.find({}, function (err, result) {
        if (err) {
            req.flash('error', "Unexpected Error: " + err.message );
        } else {
            res.render('campgrounds/index', { campgrounds: result, currentUser: req.user });
            req.flash('success', "Welcome back to YelpCamp, " + req.body.username + "!");
        }
    });
});

router.get('/campgrounds/new', middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new", { currentUser: req.user });
});

router.post('/campgrounds', middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    var createdAt = req.body.createdAt;
    var format = req.body.createdAt;
    console.log(format);
    var newCamp = {name: name, image: image, description: description, author: author, price: price, createdAt: format };

    Campground.create(newCamp, function (err, result) {
        if (err) {
            req.flash('error', "Unexpected Error: " + err.message);
        } else {
            res.redirect('/campgrounds');
        }
    });

});
//show more info about campground
router.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            req.flash('error', "Unexpected Error: " + err.message);
        } else {
            res.render("campgrounds/show", { campground: foundCamp, currentUser: req.user });
        }
    });
});

//edit campground
router.get('/campgrounds/:id/edit', middleware.isLoggedIn, middleware.campAuthentication, function(req, res){
        Campground.findById(req.params.id, function (err, matchedCamp) {
            if(err) {
                res.flash('error', "Campground doesn't exist");
            }
            res.render('campgrounds/edit', { campground: matchedCamp });     
        });
});

//update campground
router.put('/campgrounds/:id', middleware.isLoggedIn, middleware.campAuthentication, function(req, res){   
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCamp) {
        if(err){
            res.flash('error', "Campground doesn't exist");
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/'+ req.params.id); 
        }
    });
});
//Destroy campground
router.delete('/campgrounds/:id', middleware.isLoggedIn, middleware.campAuthentication, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCamp){
        if (err) {
            res.flash('error', "Campground doesn't exist");
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router