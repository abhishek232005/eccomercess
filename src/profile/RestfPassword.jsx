import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestfPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast.error("Email and password are required.");
                return;
            }
            

            const response = await axios.post('http://localhost:4000/reste_password', { email, password });
            if (response.status === 201) {
                toast.success("Profile updated successfully");
            } else {
                toast.error("Failed to update profile");
            }
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Rest Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                /> <br /><br />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                /> <br /><br />
                <button>Reset Password</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RestfPassword;
