var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
          {name:"leaky claudron",  
          image:"https://images.pottermore.com/bxd3o8b291gf/4Z92P1ObJe4kesMkaMW4sO/e4a729c354db4d8704e1f27fb209d40d/DiagonAlley_PM_B1C5M1_DiagonAlley_V1_Moment.jpg?w=1450&h=635&fit=thumb&f=center&q=85",
          description:"laks all info"
        },
        {name:"hogsmeade",  
          image:"https://images.pottermore.com/bxd3o8b291gf/4Z92P1ObJe4kesMkaMW4sO/e4a729c354db4d8704e1f27fb209d40d/DiagonAlley_PM_B1C5M1_DiagonAlley_V1_Moment.jpg?w=1450&h=635&fit=thumb&f=center&q=85",
          description:"village lol :p"
        },

        {name:"three broomsticks",  
          image:"https://images.pottermore.com/bxd3o8b291gf/4Z92P1ObJe4kesMkaMW4sO/e4a729c354db4d8704e1f27fb209d40d/DiagonAlley_PM_B1C5M1_DiagonAlley_V1_Moment.jpg?w=1450&h=635&fit=thumb&f=center&q=85",
          description:"butterbeer for free"
        }



    ]
function seedDB(){
    
    Campground.remove({},(err)=>{
    if(err){
        console.log(err);
    }
    console.log("removed");
    data.forEach((seed)=>{
        Campground.create(seed,(err,campground)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("added");
                Comment.create({
                    text:"yeh jagah bekaar hai bilkil",
                    author:"potterhead"
                },(err,comment)=>{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("comment");
            });
            }});
    });
    
    });

}

module.exports=seedDB;
