
const { Router} = require ( "express")
const { userModel, purchaseModel} = require("./db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
// const JWT_USER_PASSWORD = "ugd5f446ffhunj"
const  {JWT_USER_PASSWORD} = require("../config");


const bcrypt = require("bcrypt");
const { usermiddleware } = require("../middleware/user");

userRouter.post("/signup", async function(req,res){
const { email , password , firstname , lastname } = req.body;
   
//hash the password planetext do not store in db.



try{   
 const hashpassword =  await bcrypt.hash(password , 10);
 console.log(hashpassword);
 await userModel.create({
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



    
    userRouter.post("/signin", async function(req,res){

        const { email , password} = req.body;


        //TODO: idealy password should be hashed 
        const user =  await userModel.findOne({
            email:email,
           
        });

        if(user){
         const token =   jwt.sign( {
            id: user._id
           } , JWT_USER_PASSWORD)

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
    
    userRouter.get("/purchases", usermiddleware,  async function(req,res){

        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId,
        })
    res.json({
       purchases
    })
    
    })


module.exports = {
    userRouter: userRouter
}

