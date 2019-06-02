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

  mongoose.connect("mongodb://localhost/yelpcamp");
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  console.log(__dirname + "\public");
 

  //schema
  seedDB();
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
  app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    console.log(res.locals.currentUser);
    next();
  });

  app.get("/", (req, res) => {
    res.render("landing");
  });
  app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allcampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", {
          campgrounds: allcampgrounds,
          currentUser:req.user
        });
      }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});
  });
  app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var newCampground = {
      name: name,
      image: img,
      description: desc
    };
    Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      }
    });
  });
  app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
  });
  app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {

        res.render("campgrounds/show", {
          campground: foundCampground
        });
      }


    });
  });



  //==================
  //comments routes
  //==================
  app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        console.log(err);
      } else {
        res.render("comments/new", {
          campground: campground
        });
      }
    });

  });
  app.post("/campgrounds/:id/comments",isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        console.log(err);
        res.redirect("/campgrounds");

      } else {
        Comment.create(req.body.comment, (err, comment) => {
          if (err) {
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        });
      }
    });
  });

  //=============
  //auth routes
  //=============
  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", (req, res) => {
    var newUser = new User({
      username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/campgrounds");
      });

    });
  });
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req, res) => {
    //middleware waala
  });
  app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
  });

  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };

  app.listen("4000", process.env.IP, () => {
    console.log("Yelpcamp started");

  });
