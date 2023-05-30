const express= require("express")
const {userModel}= require("../model/userModel")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const userRouter= express.Router()
require("dotenv").config

userRouter.post("/api/register",async(req,res)=>{
    const {name, email, password}= (req.body)
    try{
        //for hatching the pass
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err) {
                res.status(201).send({"msg":"Something went wrong","error":err.message})
            }else {
                let user= new userModel({name, email,password:hash})
                await user.save()
                res.send({"msg":"New users has been register"})
            }
        });
       
    }catch(err){
        res.status(400).send({"msg":"Something went wrong","error":err.message})
    }
   
})

userRouter.get("/",async(req,res)=>{
    try{
        const data= await userModel.find()
        res.send(data)

    }
    catch(err){
        console.log(err);
    }
})
userRouter.post("/api/login",async(req,res)=>{
    const {email,password}= req.body

    try{
        const user= await userModel.find({email})
        const hash_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password, hash_pass, (err, result)=> {
               if(result){
                    let token= jwt.sign({userID:user[0]._id},"masai")
                    res.status(201).send({"msg":"Logged in","token":token})
               }else{
                    res.status(400).send({"msg":"wrong Credintials"})
               }
            });
            
        }else{
            res.status(400).send({"msg":"wrong Credintials"})
        }
    }catch(err){
        res.status(400).send({"msg":"Something went wrong","error":err.message})
    }

    
})

module.exports={
    userRouter
}