
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  filter: { type: String, required: true },
  product_type: { type: String, required: true },
  fragrance_Name: { type: String, required: true },
  fragrance_category: { type: String, required: true },
  new_arrival: { type: Boolean, required: true },
  best_seller: { type: Boolean, required: true },
  top_rated: { type: Boolean, required: true },
  category: { type: String, required: true },

});

const Product = mongoose.model('Product', productSchema);

// // Orders model
// const orderSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: User, // Establishing a reference to the User model
//   },
//   status: String,
//   total: Number,
//   created_at: Date,
// });

// const Order = mongoose.model('Order', orderSchema);



module.exports = {
  Product
}
