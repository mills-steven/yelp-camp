var express = require('express')
var router = express.Router();
var Campground = require('../models/campground');
var Comments = require('../models/comment');
var middleware = require('../middleware');


//new comment
router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {  
            req.flash('error', "Unexpected Error: " + err.message);  
        } else {
            res.render('comments/new', { campground: campground, currentUser: req.user });
        }
    });
});
//create comment
router.post('/campgrounds/:id/comments', middleware.isLoggedIn,  function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            req.flash('error', "Unexpected Error: " + err.message);
            res.redirect('/campgrounds');
            
        } else {
            Comments.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash('error', "Unexpected Error: " + err.message);
                } else {
                    //add username and id to comment then save commment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', "Successfully created a new post!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


//edit comment
router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.commentAuthentication,  function(req, res){
    Comments.findById(req.params.comment_id, function (err, foundComment){
        if(err){
            req.flash('error', "Unexpected Error: " + err.message);
            res.redirect('back');
        }else {
            res.render('comments/edit', { campground_id: req.params.id, comment: foundComment});
        }
    })
    
});

//update comment
router.put('/campgrounds/:id/comments/:comment_id', middleware.commentAuthentication, function(req,res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash('error', "Unexpected Error: " + err.message);
            res.redirect('back');
        } else {
            req.flash('success', "Updated comment has been saved to the database.");
            res.redirect('/campgrounds/'+ req.params.id);   
        }
    });
});

//delete comment
router.delete('/campgrounds/:id/comments/:comment_id', middleware.commentAuthentication, function (req, res) {
        Comments.findByIdAndRemove(req.params.comment_id, function(err, deleteComment){
        if(err){
            req.flash('error', "Unexpected Error: " + err.message);
            res.redirect('back');
        } else {
            req.flash('success', "Comment has been deleted");
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
 });



module.exports = router;