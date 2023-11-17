const express = require("express");

const { Product } = require("../models/product.model");
const { cartmodel } = require("../models/cartItem.model");

const product_route = express.Router();

// getting the data at very first time with pagination
product_route.get("/getData", async (req, res) => {
  try {


    // Parse the page number from the request query parameters (e.g., /getData?page=2)
    const page = parseInt(req.query.page) || 1;

    // Set the number of products per page
    const perPage = 8;

    // Calculate the number of products to skip based on the current page
    const skip = (page - 1) * perPage;

    // Query the database for products with pagination
    const data = await Product.find()
      .skip(skip)
      .limit(perPage);

    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const response = {
      data,
      pageInfo: {
        totalProducts: totalCount,
        totalPages,
        currentPage: page,
        pageSize: perPage
      }
    };
    res.status(200).json(response);


    //const data = await Product.find();
    //res.status(200).json(data)

  } catch (error) {
    res.status(400).json({ "msg": error.message })
  }
})


// Route for adding product from admin side 
product_route.post("/add", async (req, res) => {
  const { image, name, rating, price, quantity, description, filter, product_type, fragrance_Name, fragrance_category, new_arrival, best_seller, top_rated, category } = req.body;

  try {
    const data = new Product({ image, name, rating, price, quantity, description, filter, product_type, fragrance_Name, fragrance_category, new_arrival, best_seller, top_rated, category });

    await data.save();

    res.status(200).json({ "msg": "Product added successfully" })
  } catch (error) {
    res.status(400).json({ "msg": error.message })
  }

})



// Route to get filtered and sorted data 
product_route.get('/filter-and-sort', async (req, res) => {
  try {
    const { fragranceCategory, productType, sortBy, searchQuery } = req.query;

    let filter = {};
    if (fragranceCategory) {
      filter.fragrance_category = fragranceCategory;
    }
    if (productType) {
      filter.product_type = productType;
    }

    // Add search functionality
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      // Use the $or operator to match either 'name' or 'category' fields
      filter.$or = [
        { name: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { fragrance_category: { $regex: searchRegex } },
        { fragrance_Name: { $regex: searchRegex } },
        { filter: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ];
    }

    let sort = {};
    if (sortBy === 'price Low to High') {
      sort.price = 1; // Sort by price in ascending order
    } else if (sortBy === 'price High to Low') {
      sort.price = -1; // Sort by price in descending order
    }

    const data = await Product.find(filter).sort(sort);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route for adding the product to the cart
product_route.post('/addtocart', async (req, res) => {

  try {
    const { image, name, rating, price, PrductId, quantity, UserId } = req.body
    const CartItem = await cartmodel.create({ image, name, rating, price, PrductId, quantity, UserId });
    res.status(201).json(CartItem);

  } catch (error) {

    res.status(400).json({ "msg": message.error });

  }

});


// Route for disaplaying the cart-items to user and ensuring that data of that user only
product_route.get("/display-cart-data", async (req, res) => {

  try {
    const data = await cartmodel.find();

    res.status(201).send(data);
  } catch (error) {
    res.status(400).json({ "msg": message.error })
  }

});



module.exports = {
  product_route
}