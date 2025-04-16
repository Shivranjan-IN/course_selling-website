
const {Router} = require("express")
// const {purchaseModel} = require("../db");
const {userModle, purchaseModel, courseModel}= require("./db");
const { usermiddleware } = require("../middleware/user");
const courseRouter = Router();



courseRouter.get("/purchase",  async function(req,res){
const userId = req.userId;
const courseId = req.courseId;

await purchaseModel.create({
userId,
courseId

})
    
res.json({
    message : " your courses has been  successfully puchaesed"
})
    
    })
    
    
    
    courseRouter.get("/preview",  async  function(req,res){

        const courses = await courseModel.find({});
    res.json({

       courses
    })
    
    })
   
    
   module.exports = {
CourseRouter: courseRouter

   }
        
    
    