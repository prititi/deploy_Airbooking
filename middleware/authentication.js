const jwt= require("jsonwebtoken")
require("dotenv").config
const authentication= (req,res, next)=>{
    const token= req.headers.authorization
    if(token){
        jwt.verify(token, "masai", (err, decoded)=>{
            if(decoded){
                req.body.userID= decoded.userID
                
                next()
                return;
            }else{
                res.status(201).send({"msg":"Please login"})
            }
        })
    }else{
        res.status(400).send({"msg":"Please login"})
    }
}

module.exports={
    authentication
}