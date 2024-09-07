import React, { useContext, useEffect, useState } from 'react';
import {PostContext} from '../../store/PostContext'

import './View.css';
function View() {
  // const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  // const {firebase} = useContext(FirebaseContext)
  // useEffect(() => {
  //   const {userId}=postDetails
  //   //fetch seller details using userId
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails && postDetails.image}
          alt="image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails.price} </p>
          <span>{postDetails && postDetails.name}</span>
          <p>{postDetails && postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
