const mongoose=require("mongoose");

// Users model
const userSchema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, require:true}
});


const store_username=new mongoose.Schema({
  username:{type:String,required:true}
})
const userModel = mongoose.model('User', userSchema);

const store_usermodel=mongoose.model("usernames",store_username);


module.exports = { userModel, store_usermodel };