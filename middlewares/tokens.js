const jwt=require('jsonwebtoken');
const User=require('../models/users');

function generateToken(req,res,next){
    const token=jwt.sign({userId:req.userId},process.env.SECRET_KEY,{expiresIn:'30d'});
    res.status(200).json({token:token,userId:req.userId});
}

function verifyToken(req,res,next){
    const token=req.headers['authorization'];
    if(!token){
        res.status(401).json({err:"No token provided"});
    }
    else{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){

                res.status(401).json({err:"Invalid token"});
            }
            else{
                req.userId=decoded.userId;
                next();
            }
        });
    }
}

module.exports={generateToken,verifyToken};