import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkoutaddress = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [erraddress, setErrAddress] = useState('');
    const [errcity, setErrCity] = useState('');
    const [errstate, setErrState] = useState('');
    const [errcountry, setErrCountry] = useState('');
    const [errpincode, setErrPincode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setErrAddress('');
        setErrCity('');
        setErrState('');
        setErrCountry('');
        setErrPincode('');

        // Validate input fields
        let valid = true;
        if (!address.length) {
            setErrAddress('Address is required');
            valid = false;
        }
        if (!city.length) {
            setErrCity('City is required');
            valid = false;
        }
        if (!state.length) {
            setErrState('State is required');
            valid = false;
        }
        if (!country.length) {
            setErrCountry('Country is required');
            valid = false;
        }
        if (!pincode.length) {
            setErrPincode('Pincode is required');
            valid = false;
        }

        if (valid) {
            const totalPrice = sessionStorage.getItem("totalPrice");
            const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));

            try {
                let token = Cookies.get('token');
                const headers = { 'token': token };
                const response = await axios.post('http://localhost:4000/order_create', {
                    shippingInfo: { address, city, state, country, pincode },
                    orderItems,
                    totalPrice,
                    itemPrice: totalPrice
                }, { headers });

                console.log('API Response:', response.data);

                if (response.data) {
                    const orderId = response.data._id;
                    console.log('Order ID:', orderId);
                    toast.success('Order done successfully');
                    navigate(`/order-view/${orderId}`);
                } else {
                    toast.error('Order creation failed');
                }
            } catch (error) {
                console.error('Error during order creation:', error.message);
                toast.error('Error during order creation');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setErrAddress('');
                    }}
                    placeholder="Enter Address"
                />
                {erraddress && <h2>{erraddress}</h2>}

                <br /><br />
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setErrCity('');
                    }}
                    placeholder="Enter City"
                />
                {errcity && <h2>{errcity}</h2>}

                <br /><br />
                <select id="state" value={state} onChange={(e) => {
                    setState(e.target.value);
                    setErrState('');
                }}>
                    <option value="">State</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
                {errstate && <h2>{errstate}</h2>}

                <select id="country" value={country} onChange={(e) => {
                    setCountry(e.target.value);
                    setErrCountry('');
                }}>
                    <option value="">Country</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="USA">USA</option>
                    <option value="England">England</option>
                </select>
                {errcountry && <h2>{errcountry}</h2>}
                <br /><br />

                <input
                    type="number"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => {
                        setPincode(e.target.value);
                        setErrPincode('');
                    }}
                    placeholder="Enter Pincode"
                />
                {errpincode && <h2>{errpincode}</h2>}
                <br /><br />

                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default Checkoutaddress;
