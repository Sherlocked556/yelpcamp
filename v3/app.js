  var express =require("express"),
   app=express(),
   bodyParser=require("body-parser"),
   mongoose=require("mongoose");
   Campground=require("./models/campground");
   seedDB=require("./seeds");

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
        res.render("index",{campgrounds:allcampgrounds});
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
      res.render("new.ejs");
    });
    app.get("/campgrounds/:id",(req,res)=>{
      Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
      if(err){
        console.log(err);
      } 
      else{
        console.log("found")
      res.render("show",{campground:foundCampground});
      } 
      
      
    });
  });

  app.listen("4000", process.env.IP,()=>{
      console.log("Yelpcamp started");

  });


