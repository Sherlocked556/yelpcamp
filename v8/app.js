  var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");


  var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgounds"),
    authRoutes = require("./routes/index");



  mongoose.connect("mongodb://localhost/yelpcamp");
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  console.log(__dirname + "\public");
  
  //seed
  //seedDB();
  //Passport config
  app.use(require("express-session")({
    secret: "achchA ji aapko sab pata hai chalo dekhte hau",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });


  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };
  
  app.use("/",authRoutes);
  app.use("/campgrounds",campgroundRoutes);
  app.use("/campgrounds/:id/comments",commentRoutes);

  app.listen("4000", process.env.IP, () => {
    console.log("Yelpcamp started");

  });