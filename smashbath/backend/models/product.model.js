
const mongoose=require("mongoose");

const {User}=require("./user.model")



const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    created_at: Date,
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  // Orders model
  const orderSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // Establishing a reference to the User model
    },
    status: String,
    total: Number,
    created_at: Date,
  });
  
  const Order = mongoose.model('Order', orderSchema);



  module.exports={
    Product,Order
  }
  