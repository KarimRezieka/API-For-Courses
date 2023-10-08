const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const httpStatusText = require('./utils/httpStatusText');
require('dotenv').config()
const url = process.env.MONGO_URL 
let { courses } = require("./data/courses");
let courseController = require("./controllers/courses-controller");
const { body, validationResult } = require("express-validator");
const app = express();
const usersRouter = require('./routes/users.route')

mongoose.connect(url).then(() => {
  console.log("server connceted");
});

app.use(express.json());
app.use(cors())
app.use('/api/users',usersRouter)
//get all courses
app.get("/api/courses", courseController.GetAllCourses);
//get a single course
app.get("/api/courses/:courseId", courseController.GetCourse);
// Create a new course

//old way to make validate
/*
app.post('/api/courses',)*/

// Create a new course  with using express validator
app.post(
  "/api/courses",
  [
    body("title")
      .notEmpty()
      .withMessage("title is requires")
      .isLength({ min: 2 })
      .withMessage("title at least is 2 digits"),
    body("price").notEmpty().withMessage("title at least is 2 digits"),
  ],
  courseController.CreateCourse
);

//update course
app.patch("/api/courses/:courseId", courseController.UpdateCourse);

//delete course
app.delete("/api/courses/:courseId", courseController.DeleteCourse);

app.all('*',(req,res,next)=>{
return res.status(400).json({status:httpStatusText.ERROR,message:"this resource is not avaliable "})
})

app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port : 443");
});
