const jwt=require('jsonwebtoken');
const users=require('../modules/users');

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
                req.body.userId=decoded.userId;
                next();
            }
        });
    }
}
function verifyAdmin(req,res,next){
    users.findById(req.body.userId,(err,data)=>{
        if(err) res.status(500).json({err:err});
        else if(!data){
            res.status(301).json({err:"Invalid token"});
        }
        else{
            if(data.admin){
                next();
            }
            else{
                res.status(301).json({err:"You are not an admin"});
            }
        }
    })
}
module.exports={generateToken,verifyToken,verifyAdmin};