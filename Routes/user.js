const router=require('express').Router();

const users=require('../modules/users');

const {generateToken,verifyToken}=require('../middlewares/tokens');


router.post('/login',(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    if(!email || !password){
        res.status(301).json({err:"Please enter email and password"});
    }else{
        users.findOne({'email':email,'password':password},(err,data)=>{
            if(err) res.status(500).json({err:err});
            else if(!data){
                res.status(301).json({err:"Invalid email or password"});
            }
            else{
                req.userId=data._id;
                next();
            }
        });
    }
},generateToken);

router.post('/signup',(req,res,next)=>{
   const {email,password,name}=req.body;
    if(!email || !password || !name){
        res.status(301).json({err:"Please enter email,password and name"});
    }
    else{
        users.find({email:email},(err,data)=>{
            if(err) res.status(500).json({err:err});
            else if(data.length>0){
                res.status(301).json({err:"Email already exists"});
            }
            else{
                const user=new users({
                    email:email,
                    password:password,
                    name:name
                });
                user.save((err,data)=>{
                    if(err) res.status(500).json({err:err});
                    else{
                        req.userId=data._id;
                        next();
                    }
                })
               }
            })
        }
},generateToken);

module.exports=router;