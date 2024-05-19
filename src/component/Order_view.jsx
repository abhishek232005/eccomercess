import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderView = () => {
    const [order, setOrder] = useState(null);
    const { orderId } = useParams();

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/order_singel/${orderId}`);
            console.log("Fetching order with ID:", orderId);
            setOrder(response.data);
            console.log('Order data:', response.data);
        } catch (err) {
            console.error('Error fetching order:', err);
            toast.error(err.response.data.message)
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalPrice = order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Order Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Shipping Info</h2>
                    <p><strong>Address:</strong> {order.shippingInfo.address}</p>
                    <p><strong>City:</strong> {order.shippingInfo.city}</p>
                    <p><strong>State:</strong> {order.shippingInfo.state}</p>
                    <p><strong>Pincode:</strong> {order.shippingInfo.pincode}</p>
                    <p><strong>Phone Number:</strong> {order.shippingInfo.phoneNumber}</p>
                    <p><strong>Country:</strong> {order.shippingInfo.country}</p>
                </div>
                <div className="col-md-6">
                    <h2>Order Items</h2>
                    <ul className="list-group">
                        {order.orderItems.map(item => (
                            <li key={item.productId._id} className="list-group-item">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Price:</strong> ₹{item.price}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <img src={`http://localhost:4000/${item.image}`} alt={item.name} style={{ width: '100px' }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <h2>Order Status</h2>
                    <p><strong>Status:</strong> Processing</p>
                </div>
                <div className="col-md-6">
                    <h2>Payment Mode</h2>
                    <p>CASH ON DELIVERY</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <h2>Price</h2>
                    <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
