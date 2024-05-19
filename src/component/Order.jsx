import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/Order.css';


const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/order_get');
        console.log('Response:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const orderCheck = async () => {
    try {
      const token = Cookies.get('token');
      let headers = {
        'token': token
      };
  
      const response = await axios.post(
        'http://localhost:4000/order_create',
        { headers: headers }
      );
      console.log('Response:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="order-list-container">
      <h2 className="order-heading">Order List</h2>
      <ul>
      {orders.length && orders.map((order, index) => (
  <li key={index} className="order-item">
    {/* Shipping Info */}
    <p className="shipping-address">
      Shipping Address: {order?.shippingInfo?.address},  
      City: {order?.shippingInfo?.city}, 
      State: {order?.shippingInfo?.state}, 
      PhoneNumber: {order?.shippingInfo?.phoneNumber}
    </p>

    {/* Order Items */}
    {order.orderItems.map((item, i) => (
      <div key={i}>
        <p className="order-item">
          Order-Item:  Name: {item.name}, Price: {item.price}, quantity: {item.quantity}
        </p>
        {/* Render image if it exists */}
        {item.image && item.image[0] && (
          <img src={item.image[0]} alt={`Image of ${item?.name}`} />
        )}
      </div>
    ))}

    {/* Order Summary */}
    <p>Item Price: {order?.itemPrice}</p>
    <p>Tax Price: {order?.taxtPrice}</p>
    <p>Shipping Price:{order?.shippingPrice}</p>
    <p>Total Price: {order?.totalPrice}</p>
    {/* Pass orderId to orderCheck */}
    <button onClick={() => orderCheck(order._id)}>Check out</button>
  </li>
))}
      </ul>
    </div>
  );
};

export default OrderList;
