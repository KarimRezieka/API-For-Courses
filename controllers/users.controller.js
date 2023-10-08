const User = require('../models/User.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const httpStatusText = require('../utils/httpStatusText');
const { response } = require('express');
const { error } = require('jsend');
const getAllUsers = (async (req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1
    const skip = (page -1) * limit
    const users =await User.find({},{"__V":false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS,data:{users}});
})

const register = asyncWrapper(async(req,res)=>{
    const{firstName,lastName,email,password}= req.body
    const oldUser=await User.findOne({email:email});
    if(oldUser){
        return res.status(400).json({status:httpStatusText.ERROR,data:null,message:"already exist"})
}
   const newUser = new User({
    firstName,
    lastName,
    email,
    password
   })
   await newUser.save();
    res.status(201).json({status:httpStatusText.SUCCESS,data:{user: newUser}})
})

const login = ()=>{}

module.exports ={
    getAllUsers,
    register,
    login
}