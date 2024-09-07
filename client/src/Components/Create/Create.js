import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('name', name);
    formData.append('user', user);

    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/items/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Uploaded successfully');
      // navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error uploading data');
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="price"
            name="price"
          />
          <br />
          <img alt="Preview" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
          <br />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
          />
          <br />
          <button type="submit" className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;


// Upload image to Firebase Storage
      // const imageRef = ref(storage, `images/${image.name}`);
      // await uploadBytes(imageRef, image);
      // const imageUrl = await getDownloadURL(imageRef);