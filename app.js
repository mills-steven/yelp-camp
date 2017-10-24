var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var LocallStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comments  = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seed');
var commentsRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var authRoutes = require('./routes/index');




mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Foxy is the best',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocallStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('_method'));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);



//seedDB(); //seed database  

app.listen(3000, function(){
      console.log("YelpCamp sever has started");
  });