const express = require("express");
const router = express.Router();
const  User = require ("../models/users");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const users = require("../models/users");




//image upload
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads");
    },
    filename:function(req,file,callback){
        callback(null, file.fieldname + '-' + Date.now() +"_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");


//insert user into our database


//getting users route
router.get("/",(req,res)=>{
    User.find().exec()
    .then(user =>{
        res.render("index",{
            title:"Home page",
            users:users
        })
    })
    .catch(err =>{
        res.json({message:err.message});
    });
});


//insert an user to our database
router.post("/", upload, async (req,res)=>{
    const user = await new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
      image:req.file.filename
    })
    user.save()
    res.redirect("/");
    // console.log(user);
    // res.send({
    //     status: 'success',
    //     data: {
    //         user,
    //     }
   // })
    // res.send('saved')
    // .then(()=>{
    //     req.session.message={
    //         type:"success",
    //         message:"user added successfully"
    //     };
    //    
    // })
    // .catch(err=>{
    //     res.json({message: err.message, type:"danger"});
    // });
});
module.exports= router;
