const User = require('../models/User.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const httpStatusText = require('../utils/httpStatusText');
const { response } = require('express');
const { error } = require('jsend');
const bcrypt = require('bcryptjs');
const getAllUsers = (async (req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1
    const skip = (page -1) * limit
    const users =await User.find({},{"__V":false,'password':false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS,data:{users}});
})

const register = asyncWrapper(async(req,res)=>{
    const{firstName,lastName,email,password}= req.body
    const oldUser=await User.findOne({email:email});
    if(oldUser){
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"already exist"})
}
 const hashedPassword=await bycrpt.hash(password,10)
   const newUser = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword
   })
   await newUser.save();
    res.status(201).json({status:httpStatusText.SUCCESS,data:{user: newUser}})
})

const login = asyncWrapper(async(req,res)=>{
    const {email,password}=req.body;
    if(!email && !password){
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"email and password dosent exist"})
    }
    const user = await User.find({email:email});
    if(!user){
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"user not found "})

    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (user && matchedPassword){
        res.status(201).json({status:httpStatusText.SUCCESS,data:{user: 'logged in success'}})
    }else{
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"there is something wrong "})

    }

})

module.exports ={
    getAllUsers,
    register,
    login
}