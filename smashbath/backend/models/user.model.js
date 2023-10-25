const mongoose=require("mongoose");



// Users model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  address: String,
  role: String,
  created_at: Date,
});

const User = mongoose.model('User', userSchema);

// Products model
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
    ref: 'User', // Establishing a reference to the User model
  },
  status: String,
  total: Number,
  created_at: Date,
});

const Order = mongoose.model('Order', orderSchema);

// Reviews model
const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Establishing a reference to the User model
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Establishing a reference to the Product model
  },
  rating: Number,
  comment: String,
  created_at: Date,
});

const Review = mongoose.model('Review', reviewSchema);

// Categories model
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: Date,
});

const Category = mongoose.model('Category', categorySchema);

// OrderItems model
const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Establishing a reference to the Order model
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Establishing a reference to the Product model
  },
  quantity: Number,
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = { User, Product, Order, Review, Category, OrderItem };