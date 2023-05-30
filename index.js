const express= require('express');
const {connection}= require("./config/db")
const {userRouter}= require("./route/user.route")
const {flightRouter}= require("./route/flight.route")
const {authentication}= require("./middleware/authentication")
const {bookRouter}= require("./route/booking.route")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config()
const app= express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRouter)

app.use(authentication)
app.use("/flight",flightRouter)
app.use("/book",bookRouter)
app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connecting to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`Server listening on port no: ${process.env.port}`);
})


