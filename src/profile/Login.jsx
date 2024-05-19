import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
 import '../style/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erremail, setErrEmail] = useState('');
  const [errpassword, setErrPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const savelogin = (e) => {

    e.preventDefault();
    if (!email.length) {
      setErrEmail('Email is required');
      return;
    }
    if (!password.length) {
      setErrPassword('Password is required');
      return;
    }
    setLoading(true);

    axios.post('http://localhost:4000/login-user', {
      email: email,
      password: password
    })
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          toast.error("Login failed");
        } else {
          toast.success("You are logged in");
          Cookies.set('token', res.data.token, { expires: 7 });
          Cookies.get('token',res.data.token, {expires:7})
          setIsLoggedIn(true);
          navigate('/product?login=true'); // Navigate to View Profile page
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Login page</h1>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <NavLink to={'/viewprofile'} style={{color:'black',margin:"20px"}}>View Profile</NavLink >
        </div>
      ) : (
        <form onSubmit={savelogin}>
          <input type="email" name="email" value={email} onChange={(e) => {
            setEmail(e.target.value);
            setErrEmail('');
          }} placeholder="Enter email" id="" /> <br /> <br />
          {erremail && <h2>{erremail}</h2>}
          <input type="password" name="password" value={password} onChange={(e) => {
            setPassword(e.target.value);
            setErrPassword('');
          }} placeholder="Enter password" id="" /> <br /><br />
          {errpassword && <h2>{errpassword}</h2>}
         
          <button type="submit" disabled={loading}>
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      )}
      <ToastContainer /> 
      <NavLink to={'/singup'} style={{color:'black',margin:"20px"}}>Signup</NavLink > <br /><br />
      <Link to={'/forgetpassword'}style={{textAlign:"center",marginRight:"30px"}} >Forget Password</Link>
    </div>
  );
};

export default Login;
