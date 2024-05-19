import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckOut = ({ cartItems,totalPrice }) => {
    const navigate = useNavigate();

    const checkout = async () => {
        try {
            console.log("Checkout function called");

            // Mapping cart items to order items
            let cartitem = cartItems.map((item) => ({
                name: item.productId.productname,
                image: item.productId.image[0],
                price: item.productId.price,
                quantity: item.quantity,
                productId: item.productId._id,
            }));

            const totalPriceString = totalPrice.toString();

            // Storing data in session storage
            sessionStorage.setItem("orderItems", JSON.stringify(cartitem));
            sessionStorage.setItem("totalPrice", totalPriceString);

            console.log("Data stored in sessionStorage:", {
                cartItems: cartItems,
                totalPrice: totalPriceString
            });

            navigate('/address');
        } catch (error) {
            console.error('Error during checkout:', error.message);
            alert("Error during checkout. Please try again later.");
        }
    };

    return (
        <div>
            <p>Total Amount: {totalPrice}</p>
            <button onClick={checkout}>Check Out</button>
        </div>
    );
};

export default CheckOut;
