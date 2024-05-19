import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Addtocart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.post('http://localhost:4000/cart_find');
                setCart(response.data);
                console.log(response.data);
                setCart([...response])
              
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async () => {
        try {
         const token = Cookies.get('token')
         console.log(token);
         let headers = {
            'token': token
         }
         console.log(headers);
            const data = { userId: '65d9b0de87c3ce9db406d169', productId: '6617afcf26c21e39e0cb2245', quantity: 1 }; 
            const response = await axios.post('http://localhost:4000/cart_create', data, {headers:headers}); 
            setCart(response.data);
            console.log(response.data);
            toast.success("Successfully added to cart");
            navigate('/view_cart')
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <div className={"addtocart_btn"}>
   
            {
            cart.length && cart.map((item, index) => (
                <div key={index}>
                    <p>User ID: {item.userId}</p>
                    <p>Product ID: {item.productId}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
                     <button style={{textAlign:"right",marginRight:"238px"}} className={'addtocart'} onClick={addToCart}>Add to Cart</button>
             <ToastContainer/>
        </div>
    );
};

export default Addtocart;
