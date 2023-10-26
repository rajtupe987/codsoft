const jwt =require('jsonwebtoken')
const {userModel} = require("../models/user.model") 
require("dotenv").config()
const {store_usermodel}=require("../models/user.model")

const authMiddleWare = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,process.env.secre_key);
       
        const {userId} = decodedToken;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(401).json({message:"User not found",ok:false})
        }

        req.body.user = {
            _id: userId,
           
         }
        next();

    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}

module.exports = {authMiddleWare}

   // const user_name = new store_usermodel({ username });
        // await user_name.save();

        // const user = await userModel.findById(userId);
