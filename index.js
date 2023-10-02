const express = require("express");
const mongoose = require("mongoose");
const url =
'mongodb+srv://karim:11111@coursesdb.fbt3ano.mongodb.net/?retryWrites=true&w=majority;'
let { courses } = require("./data/courses");
let courseController = require("./controllers/courses-controller");
const { body, validationResult } = require("express-validator");
const app = express();
// mongoose.connect(url).then(()=>{
//     console.log("connected to db")
// })

mongoose.connect(url).then(() => {
  console.log("db conn");
});

app.use(express.json());
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

app.listen(443, () => {
  console.log("listening on port : 443");
});
