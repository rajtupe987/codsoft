const mongoose=require("mongoose");


const CartItem=mongoose.Schema({
    PrductId:{type:String,required:true},
    quantity:{type:Number,default:1,required:true},
    UserId:{type:String,required:true}
})


const cartmodel=mongoose.model("cartitem",CartItem);


module.exports={
    cartmodel
}
