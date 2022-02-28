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
    },
    category:{
        type:Array,
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
        type:Boolean,
        default:true
    }
});

module.exports=mongoose.model('Product',product);