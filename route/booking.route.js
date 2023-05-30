
const express= require("express");
const {bookingModel}= require("../model/bookingModel")
const bookRouter= express.Router();

bookRouter.get("/api/dashboard", async(req,res)=>{
    try{
        let data= await bookingModel.find()
        res.status(200).send(data)
    }catch(err){
        res.status(400).send({ msg: 'unauthorized', error: err.message });
    }
})

bookRouter.post("/api/booking", async(req,res)=>{
    try{
        let {user,flight}= req.body;
        let data= new bookingModel({user,flight});
        await data.save()
        res.status(201).send({"msg":"booking successfully",data})
    }catch(err){
        res.status(400).send({ msg: 'unauthorized', error: err.message });
    }
})


module.exports={bookRouter}