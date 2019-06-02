  var express =require("express"),
   app=express(),
   bodyParser=require("body-parser"),
   mongoose=require("mongoose"),
   Campground=require("./models/campground"),
   seedDB=require("./seeds"),
   Comment=require("./models/comment");

  mongoose.connect("mongodb://localhost/yelpcamp");
  app.use(bodyParser.urlencoded({extended:true}));
  app.set("view engine","ejs");

  //schema
  seedDB();
  
  
  app.get("/",(req,res)=>{
      res.render("landing");
  });
  app.get("/campgrounds",(req,res)=>{
     Campground.find({},(err,allcampgrounds)=>{
       if(err){
         console.log(err);
       }
       else{
        res.render("campgrounds/index",{campgrounds:allcampgrounds});
       }
     })
    //res.render("campgrounds",{campgrounds:campgrounds});
  });
    app.post("/campgrounds",(req,res)=>{
      var name=req.body.name;
      var img=req.body.image;
      var desc=req.body.description;
      var newCampground={name:name,image:img ,description:desc};
      Campground.create(newCampground,(err,newlyCreated)=>{
        if(err){
          console.log(err);
        }
        else{
          res.redirect("/campgrounds");
        }
      });
    });
    app.get("/campgrounds/new",(req,res)=>{
      res.render("campgrounds/new.ejs");
    });
    app.get("/campgrounds/:id",(req,res)=>{
      Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
      if(err){
        console.log(err);
      } 
      else{
        
      res.render("campgrounds/show",{campground:foundCampground});
      } 
      
      
    });
  });



//==================
//comments routes
//==================
app.get("/campgrounds/:id/comments/new",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new",{campground:campground});
    }
  })
 
});
app.post("/campgrounds/:id/comments",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
      
    } else {
      Comment.create(req.body.comment,(err,comment)=>{
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  })
})



  app.listen("4000", process.env.IP,()=>{
      console.log("Yelpcamp started");

  });


