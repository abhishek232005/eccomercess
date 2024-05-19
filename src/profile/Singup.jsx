import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 

const Singup = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState(null);
    const [errFullname, setErrFullname] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/product')
        }
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        

        if (!fullname) {
            setErrFullname("Fullname is required");
        } else if (!email) {
            setErrEmail("Email is required");
        } else if (!password) {
            setErrPassword("Password is required");
        } else if (!phone) {
            setErrPhone("Phone is required");
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phone", phone);
            if (file) {
                formData.append("image", file);
            }

            try {
                
                const response = await axios.post("http://localhost:4000/singup_user",{fullname,email,password,phone}, formData);
                setLoading(false);
                if (response.auth) {
                    toast.success("Signup is galte tryagin.");
                    // localStorage.setItem('user',JSON.stringify(response))
                    // localStorage.setItem('token',JSON.stringify(response))
                
                } else {
                    toast.success("Signup successfully");
                    console.log(response);
                    Cookies.set('token', response.data.token, { expires: 7 });
                    Cookies.get('token',response.data.token, {expires:7})
                    navigate('/product')
                 
                }
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }
    };

    return (
        <div>
            <h1>Signup page</h1>
            <form onSubmit={handleSignup}>
                <input type="text" value={fullname} onChange={(e) => {
                    setFullname(e.target.value);
                    setErrFullname("");
                }} placeholder="Enter Fullname" /> <br /><br />
                {errFullname && <p>{errFullname}</p>}
                <input type="email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                    setErrEmail("");
                }} placeholder="Enter Email" /> <br /><br />
                {errEmail && <p>{errEmail}</p>}
                <input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                    setErrPassword("");
                }} placeholder="Enter Password" /> <br /><br />
                {errPassword && <p>{errPassword}</p>}
                <input type="number" value={phone} onChange={(e) => {
                    setPhone(e.target.value);
                    setErrPhone("");
                }} placeholder="Enter Phone" /> <br /><br />
                {errPhone && <p>{errPhone}</p>}
                <input type="file" onChange={(e) => {
                    setFile(e.target.files[0]);
                }} /> <br /><br />
                <button type="submit">{loading ? <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> : "Signup"}</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Singup;
