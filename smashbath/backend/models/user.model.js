const mongoose=require("mongoose");

// Users model
const userSchema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, require:true}
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };