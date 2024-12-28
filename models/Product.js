const mongoose = require('mongoose');
const { Schema } = mongoose;

// Product Schema Definition
const productSchema = new Schema({
  image: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  productCode: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// Generate unique product code logic
productSchema.pre('save', async function (next) {
  // Debug log to check if pre-save is triggered
  console.log('Pre-save hook triggered for:', this.title);

  if (!this.isNew) return next(); // Only generate on new documents

  try {
    let isUnique = false;
    let generatedCode = '';

    // Keep generating until a unique productCode is found
    while (!isUnique) {
      // Generate a letter (A-Z) followed by two digits (00-99)
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letters from A to Z
      const randomNumber = String(Math.floor(Math.random() * 100)).padStart(2, '0'); // Random number with two digits

      // Concatenate letter and two digits to form productCode
      generatedCode = `${randomLetter}${randomNumber}`;
      console.log('Generated productCode:', generatedCode); // Debugging the generated code

      // Check uniqueness of generatedCode in the database
      const existingProduct = await mongoose.models.product.findOne({ productCode: generatedCode });
      if (!existingProduct) {
        isUnique = true; // Unique productCode found
        console.log('Unique productCode found:', generatedCode);
      } else {
        console.log('Duplicate productCode found, regenerating...');
      }
    }

    this.productCode = generatedCode; // Set the unique productCode
    next();
  } catch (error) {
    console.error('Error generating productCode:', error);
    next(error); // Pass any errors to the next middleware
  }
});

// Model creation
const Product = mongoose.model('product', productSchema);

module.exports = Product;
