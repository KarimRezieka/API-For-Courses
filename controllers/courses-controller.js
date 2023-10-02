let {courses} = require('../data/courses')
const {validationResult}= require('express-validator')

const GetAllCourses = (req,res)=>{
    res.json(courses);
}

const GetCourse = (req,res)=>{
    const course = courses.find((course)=>course.id == req.params.courseId)
     if (!course) { 
         return res.status(404).json({msg:"course not fournd"})
     }
    res.json(course)
 
 }
 const CreateCourseOld =(req,res)=>{
    if(!req.body.title){
        return res.status(400).json({error:'title not provided'})
    }
    if(!req.body.price){
        return res.status(400).json({error:'price not provided'})
    }
    res.status(201).json(courses.push({...req.body}))
 }
 const CreateCourse = (req,res)=>{
    const errors = validationResult(req);
    console.log("errors",errors);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    res.status(201).json(courses.push({...req.body}))
}

const UpdateCourse = (req,res)=>{
    let courseId = +req.params.courseId;
    let course = courses.find((course)=>course.id === courseId);
    if(!course){
        return res.status(404).json({msg:"course not found"})
    }

course = {...course, ...req.body};
res.status(200).json(course)
    
}

const DeleteCourse = (req,res)=>{
    const courseId = +req.params.courseId;
    courses = courses.filter((course)=> course.id != courseId)
    res.status(200).json({success: true})
}

module.exports = {
    GetAllCourses,
    GetCourse,
    CreateCourse,
    UpdateCourse,
    DeleteCourse
}