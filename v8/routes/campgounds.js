var express = require("express");
var router = express.Router();
var Campground=require("../models/campground");

router.get("/", (req, res) => {
    Campground.find({}, (err, allcampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allcampgrounds,
                currentUser: req.user
            });
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});
});
router.post("/",isLoggedIn, (req, res) => {
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground = {
        name: name,
        image: img,
        description: desc,
        author:author

    };
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});
router.get("/new",isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
});
router.get("/:id", (req, res) => {
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };

module.exports = router;