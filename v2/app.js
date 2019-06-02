  var express =require("express"),
   app=express(),
   bodyParser=require("body-parser"),
   mongoose=require("mongoose"),
   Campground=require("./models/campground");
   

   mongoose.connect("mongodb://localhost/yelpcamp");
  app.use(bodyParser.urlencoded({extended:true}));
  app.set("view engine","ejs");
  
  //schema
  
  /*Campground.create({
    name:"diagon alley",
    image:"https://images.pottermore.com/bxd3o8b291gf/4Z92P1ObJe4kesMkaMW4sO/e4a729c354db4d8704e1f27fb209d40d/DiagonAlley_PM_B1C5M1_DiagonAlley_V1_Moment.jpg?w=550&h=550&fit=thumb&f=center&q=85",
    description:"hogwarts ka ration paani sab yahin ich milta hai ullu ki jagah kutta pallo par galat faimi nahi"

  },(err,newlyCreated)=>{
    if(err){
      console.log(err);
    }
      else{
        console.log(newlyCreated);
      }
    

  });*/
  
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
      Campground.findById(req.params.id,(err, foundCampground)=>{
      if(err){
        console.log(err);
      } 
      else{
        
      res.render("show",{campground:foundCampground});
      } 
      
      
    });
  });

  app.listen("4000", process.env.IP,()=>{
      console.log("Yelpcamp started");

  });


