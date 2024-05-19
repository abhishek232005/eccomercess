import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Forgetpassword.css'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/forget_password', { email });
            if (response.data.message === "otp send successfull") {
                toast.success("OTP sent successfully");
                navigate('/OTPVerification')
            } else {
                toast.error("Failed to send OTP");
            }
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Enter Email"} id="" /> <br /> 
                <button  type="submit">Send OTP</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default ForgetPassword;
