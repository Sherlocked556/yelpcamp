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
router.post("/", (req, res) => {
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
router.get("/new", (req, res) => {
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

module.exports = router;