  var express =require("express");
  var app=express();
  var bodyParser=require("body-parser");
  app.use(bodyParser.urlencoded({extended:true}));
  app.set("view engine","ejs");
  var campgrounds=[
    {name:"salmon Creek",image:"https://wallpapercave.com/wp/wp1857451.jpg"},
    {name:"kennel lodge",image:"https://wallpapercave.com/wp/wp3079209.jpg"},
    {name:"Creeky Claudron",image:"https://wallpapercave.com/wp/wp3079211.jpg"},
    {name:"salmon Creek",image:"https://wallpapercave.com/wp/wp1857451.jpg"},
    {name:"kennel lodge",image:"https://wallpapercave.com/wp/wp3079209.jpg"},
    {name:"Creeky Claudron",image:"https://wallpapercave.com/wp/wp3079211.jpg"},
    {name:"salmon Creek",image:"https://wallpapercave.com/wp/wp1857451.jpg"},
    {name:"kennel lodge",image:"https://wallpapercave.com/wp/wp3079209.jpg"},
    {name:"Creeky Claudron",image:"https://wallpapercave.com/wp/wp3079211.jpg"}
  ];
  app.get("/",(req,res)=>{
      res.render("landing");
  });
  app.get("/campgrounds",(req,res)=>{
    
    res.render("campgrounds",{campgrounds:campgrounds});
  });
    app.post("/campgrounds",(req,res)=>{
      var name=req.body.name;
      var img=req.body.image;
      campgrounds.push({name:name,image:img})
      res.redirect("/campgrounds")
    });
    app.get("/campgrounds/new",(req,res)=>{
      res.render("new.ejs");
    })

  app.listen("4000", process.env.IP,()=>{
      console.log("Yelpcamp started");

  });


