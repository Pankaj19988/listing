const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all Products "/api/listing"
router.get("/listing", async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message); // Log the actual error
  }
});

// Add a New Product "/api/listing"
router.post("/listing", async (req, res) => {
  try {
    const { image, price, title } = req.body;

    // Validate incoming request data
    if (!image || !price || !title) {
      return res.status(400).send("Please provide all required fields: image, price, and title.");
    }

    // Try to create the product
    const createProduct = await Product.create({ image, price, title });

    if (createProduct) {
      return res.status(200).send("Product Added Successfully");
    } else {
      return res.status(400).send("Unable to add product.");
    }
  } catch (error) {
    console.error("Error while adding product:", error); // Log the error to console
    res.status(500).send("Server Error: " + error.message); // Send the actual error message
  }
});

module.exports = router;
