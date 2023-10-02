const {validationResult}= require('express-validator')
const Course = require('../models/course.model')

const GetAllCourses = async(req,res)=>{
    const courses =await Course.find()
    res.json(courses);
}

const GetCourse =async(req,res)=>{
    try{
    const course= await Course.findById(req.params.courseId);
    if (!course) { 
         return res.status(404).json({msg:"course not fournd"})
     }
    res.json(course)
    } catch(err){
        return res.status(400).json({msg:"invalid object ID"})
    }
    
 
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
 const CreateCourse = async(req,res)=>{
    const errors = validationResult(req);
    console.log("errors",errors);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    const newCorurse = new Course(req.body);
    await newCorurse.save();
    res.status(201).json(newCorurse)
}

const UpdateCourse = async (req,res)=>{
   const updatedCourse =await Course.findByIdAndUpdate(req.params.courseId,{$set:{...req.body}})
    if(!course){
        return res.status(404).json({msg:"course not found"})
    }

return res.status(200).json(updatedCourse)
    
}

const DeleteCourse = async(req,res)=>{
const deletecourse = await Course.deleteOne({_id:req.params.courseId});
    res.status(200).json({success: true})
}

module.exports = {
    GetAllCourses,
    GetCourse,
    CreateCourse,
    UpdateCourse,
    DeleteCourse
}