import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Heart from '../../assets/Heart';
import './Post.css';
import {PostContext} from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const Navigate = useNavigate()
  const [products, setProducts] = useState([])
  const {setPostDetails}=useContext(PostContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call backend
        const response = await axios.get('http://localhost:5000/items/items');
        setProducts(response.data)
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Call the async function

  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product=>{
            return <div
            className="card"
            onClick={()=>{
              setPostDetails(product);
              Navigate('/view');
            }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src="../../../Images/R15V3.jpg" alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>
          })
        }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
