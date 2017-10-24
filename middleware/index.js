var Campground = require('../models/campground');
var Comments = require('../models/comment');
var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
                            if (req.isAuthenticated()) {
                                 return next();
                                 
                            }
                            req.flash('error', 'Oops, Please login before continuing!')
                            res.redirect('/login');
}

middlewareObj.campAuthentication = function (req, res, next) {
                                    if (req.isAuthenticated()) {
                                        Campground.findById(req.params.id, function (err, matchedCamp) {
                                            if (err) {
                                                req.flash('error', "Campground not found!");
                                                res.redirect('back');
                                            } else {
                                                if (matchedCamp.author.id.equals(req.user._id)) {
                                                    next();
                                                } else {
                                                    req.flash('error', "You don't have permission to do that!");
                                                    res.redirect('back');
                                                }
                                            }
                                        });
                                    } else {
                                        req.flash('error', "You need to be logged in!");
                                        res.redirect('back');
                                    }
                                }

middlewareObj.commentAuthentication = function (req, res, next) {
                                        if (req.isAuthenticated()) {
                                            Comments.findById(req.params.comment_id, function (err, matchedComment) {
                                                if (err) {
                                                    res.redirect('back');
                                                } else {
                                                    if (matchedComment.author.id.equals(req.user._id)) {
                                                        next();
                                                    } else {
                                                        req.flash('error', "You don't have permission to do that!");
                                                        res.redirect('back');
                                                    }
                                                }
                                            });
                                        } else {
                                            res.redirect('back');
                                        }
                                    }



module.exports = middlewareObj