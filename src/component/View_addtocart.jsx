// View_addtocart component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../style/View_addtocart.css';
import Cookies from 'js-cookie';
import { MdDelete } from "react-icons/md";
import CheckOut from '../profile/CheckOut';

const View_addtocart = () => {
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to fetch cart items based on quantity
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4000/cart_find?quantity=${quantity}`);
      setCartItems(response.data.cartItems);

      // Calculate total price
      let price = 0;
      response.data.cartItems.forEach(item => {
        price += item.quantity * item.productId.price;
      });
      setTotalPrice(price);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [quantity]);

  // Function to update cart item quantity
  const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 0) {
        newQuantity = 0;
      }

      const token = Cookies.get('token');
      const headers = {
        'token': token
      };
      await axios.put(`http://localhost:4000/cart/${itemId}`, { quantity: newQuantity }, { headers });
      toast.success('Item updated successfully');
      fetchCartItems();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update cart');
    }
  };

  // Function to delete item from the cart
  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${itemId}`);
      toast.success('Item deleted successfully');
      fetchCartItems();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete item');
    }
  };

  // Function to calculate total amount for a product
  const calculateTotalAmount = (item) => {
    return item?.quantity * item?.productId?.price;
  };

  return (
    <div className="cart-container">
      <h2>Cart Items</h2>
      {loading ? (
        <div className="loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li className="cart-item" key={item._id}>
              <div className="product-details">
                <img className="product-image" style={{width:"200px"}} src={`http://localhost:4000/${item?.productId?.image[0]}`} alt="product" />
                <div className="details">
                  <p style={{marginTop:"-90px",marginLeft:"-10px",textAlign:"center"}} className="product-name">ProductName: {item?.productId?.productname}</p>
                  <p style={{marginTop:"5px",marginLeft:"-10px",textAlign:"center"}} className="description">Description: {item?.productId?.descripation}</p>
                  <p style={{marginTop:"5px",marginLeft:"-10px",textAlign:"center"}} className="price">Price: {item?.productId?.price}</p>
                  <p style={{marginTop:"5px",marginLeft:"-10px",textAlign:"center"}} className="price">stock: {item?.productId?.stock}</p><p style={{marginTop:"5px",marginLeft:"-10px",textAlign:"center"}} className="price">Rating: {item?.productId?.rating}</p>
                  <div className="quantity-controls">
                    <button style={{width:"50px",textAlign:"center",marginRight:"100px"}} onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}>-</button>
                    <input style={{width:"50px",textAlign:"center",marginRight:"100px"}}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item._id, parseInt(e.target.value))}
                    />
                    <button style={{width:"50px",textAlign:"center",marginRight:"100px"}} onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="total">Total Amount: {calculateTotalAmount(item)}</p>
                </div>
                <button className="delete-btn" onClick={() => deleteCartItem(item._id)}>
                  <MdDelete />
                </button> <br /><br /> <br />
              </div>
            </li>
          ))}
          <CheckOut cartItems={cartItems} totalPrice={totalPrice} />
        </ul>
      )}
    </div>
  );
};

export default View_addtocart;
