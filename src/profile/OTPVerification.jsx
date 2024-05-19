import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPVerification = () => {
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/otp_verify", { email, otp: OTP });
          if (response.data.message === "OTP verification successful") {
               
                toast.error('otp verify failed')
              // Navigate to '/restfPassword' upon successful OTP verification
         
            } else {
                // navigate('/restfPassword')
                navigate('/restfPassword')
                toast.success("OTP verification successful");
          
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <h2>OTP Verification</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={"Enter email"} />
                </div>
                <div>
                    <label>OTP:</label>
                    <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} required placeholder={"Enter OTP"} />
                </div>
                <button type="submit">Verify OTP</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default OTPVerification;
