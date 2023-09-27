const express =require('express')
const app = express()
app.use(express.json())
const courses = [
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

app.get('/api/courses',(req,res)=>{
    res.json(courses);
})
app.get('/api/courses/:courseId',(req,res)=>{
   const course = courses.find((course)=>course.id == req.params.courseId)
    if (!course) { 
        return res.status(404).json({msg:"course not fournd"})
    }
   res.json(course)

})
app.post('/api/courses',(req,res)=>{
    res.status(201).json(courses.push({...req.body}))
})

app.listen(443,()=>{
    console.log('listening on port : 443')
})