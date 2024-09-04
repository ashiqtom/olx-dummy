const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String, // Store the path to the image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User model
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;