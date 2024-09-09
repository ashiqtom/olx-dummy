const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
require('dotenv').config();
const Item=require('../models/items')
const storage=require('../config/firebase-config')

const storageEngine = multer.memoryStorage(); 
const upload = multer({ storage: storageEngine });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const {name, category, price ,user} = req.body;
      const file = req.file;
      if (!file) {
          return res.status(400).send('No file uploaded.');
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
      const filePath = `uploads/${timestamp}-${file.originalname}`;

      const fileRef = ref(storage, filePath);

      const snapshot = await uploadBytes(fileRef, file.buffer);
      
      const downloadURL = await getDownloadURL(fileRef);

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
        image:downloadURL,
        // user: userId
      });

      await newItem.save();
      res.status(201).json({ 
          message: 'Item uploaded successfully', 
          item: newItem 
      });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error uploading item', error: err.message });
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

module.exports = router;