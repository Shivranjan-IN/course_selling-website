const mongoose = require('mongoose'); 


// mongoose.connect("mongodb+srv://Admin:jlnuufahkfhbakjbf@cluster0.cu0co.mongodb.net/coursera-app")
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;



const userSchema =  new Schema({

email : String,
password : String,
firstName : String,
lastName: String,



});
const adminSchema = new  Schema({

    
email : String,
password : String,
firstName : String,
lastName : String

});
const courseSchema =  new Schema({

   
    title : String,
    description : String,
     price : Number,
     imageUrl : String,
     creatorId : Object
});
const purchaseSchema =  new Schema({

courseId :  Object,
UserId : Object 

});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports   = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}

