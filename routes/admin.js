
const { Router } = require("express");
const { adminModel, courseModel } = require("./db");
const adminRouter =  Router();
//bcript ,zod, jsonwebtoken
//    const  {JWT_ADMIN_PASSWORD} = require("./config");
   const { JWT_ADMIN_PASSWORD } = require("../config");
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken");
const {z}= require("zod");
const { adminmiddleware } = require("../middleware/admin");
const course = require("./course");
// const JWT_ADMIN_PASSWORD = "bac56jioh55jaloclasska";


adminRouter.post("/signup" ,async function(req,res){

    const { email , password , firstname , lastname } = req.body;
   
    //hash the password planetext do not store in db.
    
    // console.log(adminRouter);
    
    try{   
     const hashpassword =  await bcrypt.hash(password , 10);
     console.log(hashpassword);
     await adminModel.create({
        email: email,
        password: hashpassword,
        firstName: firstname,
        lastName:lastname,
      })
        res.json({
    message: "you are logged in"
      
    })

    }
    catch (e){
        res.json({
            message: "signup failde"
        })
      
    }
})
adminRouter.post("/signin" ,  async function(req,res){
  
    
    const { email , password} = req.body;


    //TODO: idealy password should be hashed 
    const admin =  await adminModel.findOne({
        email:email,
       
    });

    if(admin){
     const token =   jwt.sign( {
        id: admin._id
       } , JWT_ADMIN_PASSWORD)

       res.json({
        token : token
       })
    }
    else{
        res.status(403).json({
            message: "incorrect credential"
        })
    }


})



adminRouter.post("/course" , adminmiddleware, async function(req,res){
    const adminId = req.adminId
    const { title ,  description , imageUrl, price , } = req.body;

  const course = await courseModel.create({   // from schema

        title: title,
        description:  description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: " course creaated",
        courseId : course._id
    })
})
adminRouter.put("/course" , adminmiddleware,  async function(req,res){

    const adminId = req.adminId
    const { title , description , imageUrl, price , courseId} = req.body;

   const course =  await courseModel.updateOne( {
        _id : courseId,
        creatorId: adminId
     } , {   // from schema

        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        
    })

    res.json({
        message: " course updated",
        creatorId : course._id
       
    })
})
adminRouter.get("/course/bulk" , adminmiddleware,  async function(req,res){
  
    const adminId = req.userId
   

   const courses =  await courseModel.findOne( {
        
        creatorId: adminId
     } , {   

        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        
    })

    res.json({
        message: " course updated",
       courses
    })
})



module.exports ={
    adminRouter:adminRouter
}