const { verifyAdmin, verifyToken } = require('../middlewares/tokens');

const router=require('express').Router();
const products=require('../modules/products');
const { db } = require('../modules/users');
const users = require('../modules/users');
/*
access - public 
request method get
path - /api/db/getAllproducts
response - list of all products
*/
router.get('/getAllProducts',(req,res)=>{
    products.find((err,data)=>{
        if(err) res.status(500).json({err:err});
        else res.status(200).json({data:data});
    });
})

router.get('/getProductBySearch',(req,res)=>{
    const arg=req.query.search;
    console.log(arg);
    products.find({name:{$regex: `${arg}`,$options:`i`}},(err,data)=>{
        if(err) res.status(500).json({err:err});
        else{
            if(data.length>0){
                const result=[];
                for(let i=0;i<data.length;i++){
                      result.push({name:data[i].name,id:data[i]._id});
                }
                res.status(200).json({result});
            }
            else{
                res.status(301).json({err:"No product found"});
            }
        }
    });
})



/* 
access - Public 
request method - get
path - /api/db/getProduct/:productId
response - product details
*/

router.get('/getProduct/:productId',(req,res)=>{
    products.findOne({_id:req.params.productId},(err,data)=>{
        if(err) res.status(500).json({err:err});
        else if(!data || data.length==0) res.status(301).json({err:"No product found"});
        else res.status(200).json({data:data});
    });
});


/*
access - admin
request method - post
path - /api/db/addProduct
requirements- {name,price,description,category,image,userId}=req.body;  and jwt token as authorization header
response - product added

*/ 
router.post('/addProduct',verifyToken,verifyAdmin,(req,res)=>{
     const product=new products({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            image:req.body.image, 
     });
      product.save((err,data)=>{
          if(err) res.status(500).json({err:err});
          else res.status(200).json({msg:"Product added successfully",data:data});
      })
});

/* 
access - admin
request method - put
path - /api/db/updateProduct/:productId
requirements- {name,price,description,category,image,stock}=req.body;  and jwt token as authorization header
response = updated product details
*/
router.put('/updateProduct/:productId',verifyToken,verifyAdmin,(req,res)=>{
    products.findOneAndUpdate({_id:req.params.productId},req.body,{new:true},(err,data)=>{
        if(err) res.status(500).json({err:err});
        else if(!data || data.length==0) res.status(301).json({err:"No product found"});
        else res.status(200).json({data:data});
    });
});

/* 
access - admin 
request method - delete
path - /api/db/deleteProduct/:productId
requirements - {userId}=req.body && jwt token as authorization header 
*/ 
router.delete('/deleteProduct/:productId',verifyToken,verifyAdmin,(req,res)=>{
    console.log(req.params.productId);
    products.findOneAndDelete({_id:req.params.productId},(err,data)=>{
        if(err) res.status(500).json({err:"Internal server error"});
        else if(!data || data.length==0) res.status(301).json({err:"No product found"});
        else res.status(200).json({msg:"Product deleted successfully"});
    });
});


module.exports=router;