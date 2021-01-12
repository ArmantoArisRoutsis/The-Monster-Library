require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
const  ejs = require("ejs")
const mongoose = require("mongoose")
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

var cors = require('cors')

const app = express();

app.use(cors())
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({limit: '10mb',extended: true,parameterLimit: 50000}));

app.use(session({
    secret: "Our little secret.",
    resave:false,
    saveUninitialized:false,
}));
  
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODATA,{useNewUrlParser:true});
mongoose.set("useCreateIndex",true)

//MonsterSchema
const monsterShcema = {name:String, origin:String , type:String, content:String, imageLink:String}

//userschema
const userShcema = new mongoose.Schema({userName:String,email:String,password:String})

userShcema.plugin(passportLocalMongoose);



//monster model
const Monster = mongoose.model("Monster",monsterShcema)

app.get("/monsters",function(req,res){
   Monster.find(function(err, foundMonsters){
        if(!err){
            console.log("made")
            res.send(foundMonsters)
        }else{
            res.send(err)}
   })
})

//user Model
const User = new mongoose.model("User",userShcema)

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.post("/monsters",function(req,res){
    
    const newMonster = new Monster({
        name:req.body.name,
        origin:req.body.origin,
        type:req.body.type,
        content:req.body.content,
        imageLink:req.body.imageLink
    })
    console.log("Monster Created")

    newMonster.save();
})

app.delete("/deletemonster",function(req,res){
    Monster.deleteOne({_id: req.body.source.id},function(err){
        if(!err){
            console.log("deleted!")
            res.send("sucseess")
        }else{
            res.send(err)
        }
    })
})

app.put("/updatemonster",function(req,res){
    console.log(req.body._id)
    Monster.update({_id: req.body._id},
        {name:req.body.name,
        origin:req.body.origin,
        type:req.body.type,
        content:req.body.content,
        imageLink:req.body.imageLink},
        {overwrite: true},
        function(err){
        if(!err){
            console.log("Updated!")
            res.send("sucseess Update")
        }else{
            res.send(err)
        }
    })
})



// *** AUTHENTICATION ROUTES ***

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/user",function(req,res){
   User.find(function(err, foundUsers){
        if(!err){
            console.log("made")
            res.send(foundUsers)
        }else{
            res.send(err)}
   })
})

app.post("/register",function(req,res){

    console.log("auth post made")
    console.log(req.body)

    User.register({username: req.body.name},req.body.email, req.body.password, function(err,user){
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,function(){
               res.send(user) 
            })
        }
    })
    
})

app.post("/login",function(req,res){

    console.log("Log in request made")
    console.log(req.body)

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    console.log(user)
    
    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                console.log("success")
                console.log("printTHis")
                res.send(user)
            })
        }
    })
    
    console.log("Tried to log in")
})


app.listen(process.env.PORT ||2000, function(){ 
    console.log("Server is running on port 2000")
})