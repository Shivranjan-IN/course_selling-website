 require('dotenv').config();
 const jwt = require('jsonwebtoken');
console.log(process.env.MONGO_URL);
    const express = require("express");
    const mongoose = require('mongoose'); 
    // const { config } = require("./config");

   

const{ adminRouter } = require("./routes/admin")
const {userRouter} = require("./routes/user")
const {CourseRouter} = require("./routes/course")


    const app =  express();
    app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course" , CourseRouter);
app.use("/api/v1/admin" , adminRouter);



app.use("/api/v2/user", userRouter);
app.use("/api/v2/course" , CourseRouter);
app.use("/api/v2/admin" , adminRouter);


 async function main()
{
  
  app.listen(3000);
  await mongoose.connect(process.env.MONGO_URL);

 

  console.log("leastining port 3000");
}  
   
main();32