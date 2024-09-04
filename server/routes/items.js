const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const User=require('../models/User')
const jwt = require('jsonwebtoken');

// Register
router.post('/upload', 
    // upload.single('image'), 
    async (req, res) => {
  try {
    const {user,name,category,price} = req.body;
    // let {image}=req.body
    // const image = req.file ? req.file.path : '';
    console.log(user,name,category,price)

    // // Validate userId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: 'Invalid user ID' });
    // }

    // // Check if the user exists
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // Create and save the item
    const newItem = new Item({
      name,
      category,
      price,
      // image,
      // user: userId
    });

    await newItem.save();
    res.status(201).json({ 
        message: 'Item uploaded successfully', 
        item: newItem 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading item', error: err });
  }
});


// Route to get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    // .populate('user');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
});

// // Route to get items by user ID
// app.get('/items/user/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     const items = await Item.find({ user: userId }).populate('user');
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching items', error: err });
//   }
// });

// // Route to get items by category
// app.get('/items/category/:category', async (req, res) => {
//   try {
//     const { category } = req.params;

//     const items = await Item.find({ category }).populate('user');
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching items', error: err });
//   }
// });

// // Route to get a single item by ID
// app.get('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate item ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid item ID' });
//     }

//     const item = await Item.findById(id).populate('user');
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.status(200).json(item);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching item', error: err });
//   }
// });

module.exports = router;