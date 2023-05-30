const express= require("express")
const {flightModel} = require("../model/flightModel")
// const {authentication} = require("../middleware/authentication")
const flightRouter= express.Router()

flightRouter.get("/api/flights",async(req,res)=>{
    try{
        const data= await flightModel.find()
        // res.send(data)
        res.status(200).send(data)
    }catch(err){
        // res.send("unauthorized")
        res.status(400).send({ msg: 'unauthorized', error: err.message });
    } 
})

flightRouter.get("/api/flights/:id",async(req,res)=>{
    let id= req.params.id;
    try{
        const data= await flightModel.find({"_id":id})
        // res.send(data)
        res.status(200).send(data)
    }catch(err){
        // res.send("unauthorized")
        res.status(400).send({ msg: 'unauthorized', error: err.message });
    } 
})
flightRouter.post("/api/flights",async(req,res)=>{
    let post= req.body;
    try{
        const flight= new flightModel(post)
        await flight.save()
        res.status(201).send("New flights has been added")
    }catch(err){
        res.status(400).send({"msg":"something went wrong","error":err.message})
    }
})

flightRouter.patch("/api/flights/:id",async(req,res)=>{
    let id= req.params.id;
    try{
        await flightModel.findByIdAndUpdate({"_id":id},req.body)
        res.status(202).send(`Update the flight whose id is${id}`)
    }catch(err){
        res.status(400).send({"msg":"something went wrong","error":err.message})
    }
})

flightRouter.delete("/api/flights/:id",async(req,res)=>{
    let id= req.params.id;
    try{
        await flightModel.findByIdAndDelete({"_id":id})
        res.status(202).send(`Delete the flight whose id is${id}`)
    }catch(err){
        res.status(400).send({"msg":"something went wrong","error":err.message})
    }
})

  
module.exports={
    flightRouter
}