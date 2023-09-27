const express =require('express')
const {body,validationResult}= require('express-validator')
const app = express()
app.use(express.json())
let courses = [
    {
        id:1,
        title: "js course",
        price:1000
    },
    {
        id:2,
        title: "react js course",
        price:2000
    },
    {
        id:3,
        title: "node js course",
        price:1500
    },
    {
        id:4,
        title: "nest js course",
        price:2000
    },
    {
        id:5,
        title: "next js course",
        price:3000
    },
]
//get all courses
app.get('/api/courses',(req,res)=>{
    res.json(courses);
})
//get a single course
app.get('/api/courses/:courseId',(req,res)=>{
   const course = courses.find((course)=>course.id == req.params.courseId)
    if (!course) { 
        return res.status(404).json({msg:"course not fournd"})
    }
   res.json(course)

})
// Create a new course 

//old way to make validate
/*
app.post('/api/courses',(req,res)=>{
    if(!req.body.title){
        return res.status(400).json({error:'title not provided'})
    }
    if(!req.body.price){
        return res.status(400).json({error:'price not provided'})
    }
    res.status(201).json(courses.push({...req.body}))
 })*/

// Create a new course  with using express validator
app.post('/api/courses',[
    body('title').notEmpty().withMessage("title is requires").isLength({min:2}).withMessage("title at least is 2 digits"),
    body('price').notEmpty().withMessage("title at least is 2 digits")

],(req,res)=>{
    const errors = validationResult(req);
    console.log("errors",errors);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    res.status(201).json(courses.push({...req.body}))
})

//update course 
app.patch('/api/courses/:courseId',(req,res)=>{
    let courseId = +req.params.courseId;
    let course = courses.find((course)=>course.id === courseId);
    if(!course){
        return res.status(404).json({msg:"course not found"})
    }

course = {...course, ...req.body};
res.status(200).json(course)
    
})

//delete course 
app.delete('/api/courses/:courseId',(req,res)=>{
    const courseId = +req.params.courseId;
    courses = courses.filter((course)=> course.id != courseId)
    res.status(200).json({success: true})
})


app.listen(443,()=>{
    console.log('listening on port : 443')
})