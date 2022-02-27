const mongoose=require('mongoose');

const product=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    comments:{
        type:Array,
    },
    rating:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    },
    stock:{
        type:Boolean
    }
});

module.exposts=mongoose.model('Product',product);