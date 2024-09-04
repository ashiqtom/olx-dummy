import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const handleSubmit= async(e)=>{
    try{
      e.preventDefault();

      // firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      //   ref.getDownloadURL().then((url)=>{
          // console.log(url)
          //upload to backend to axio with url
      //   })
      // })
      const response = await axios.post('http://localhost:5000/items/upload', {user,name,category,price,image});//upload date also
      console.log(response.data)
      // localStorage.setItem('token', response.data.token);
      alert('uploded');
      navigate('/');
    //upload to backend
    }catch(err){
      console.log(err)
      alert('err uploding')
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="input" 
              type="number" 
              id="fname" 
              name="Price" 
              />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
