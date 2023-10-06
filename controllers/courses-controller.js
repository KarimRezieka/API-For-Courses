const {validationResult}= require('express-validator')
const httpStatusText = require("../utils/httpStatusText")
const Course = require('../models/course.model');
const { success } = require('jsend');

const GetAllCourses = async(req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1
    const skip = (page -1) * limit
    const courses =await Course.find({},{"__V":false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS,data:{courses}});
}

const GetCourse =async(req,res)=>{
    try{
    const course= await Course.findById(req.params.courseId);
    if (!course) { 
         return res.status(404).json({status:httpStatusText.FAIL,data:{course: null}})
     }
    res.json({status:httpStatusText.SUCCESS,data:{course}})
    } catch(err){
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"invalid object id "})
    }
    
 
 }
 const CreateCourseOld =(req,res)=>{
    if(!req.body.title){
        return res.status(400).json({status:httpStatusText.FAIL,data:{errors:errors.array}})
    }
    if(!req.body.price){
        return res.status(400).json({status:httpStatusText.FAIL,data:{errors:errors.array}})
    }
    res.status(201).json(courses.push({...req.body}))
 }
 const CreateCourse = async(req,res)=>{
    const errors = validationResult(req);
    console.log("errors",errors);
    if(!errors.isEmpty()){
        return res.status(400).json({status:httpStatusText.FAIL,data:{errors:errors.array}})
    }
    const newCorurse = new Course(req.body);
    await newCorurse.save();
    res.status(201).json({status:httpStatusText.SUCCESS,data:{course:newCorurse}})
}

const UpdateCourse = async (req,res)=>{
   const updatedCourse =await Course.findByIdAndUpdate(req.params.courseId,{$set:{...req.body}})
    if(!course){
        return res.status(404).json({status:httpStatusText.ERROR,data:{errors:errors.array}})
    }

return res.status(200).json({status:httpStatusText.SUCCESS,data:{course:updatedCourse}})
    
}

const DeleteCourse = async(req,res)=>{
const deletecourse = await Course.deleteOne({_id:req.params.courseId});
    res.status(200).json({status:httpStatusText.SUCCESS,data:null})
}

module.exports = {
    GetAllCourses,
    GetCourse,
    CreateCourse,
    UpdateCourse,
    DeleteCourse
}