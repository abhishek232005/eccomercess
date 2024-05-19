// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import AddingProfile from './component/AddingProfile';
import Addtocart from './component/Addtocart';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Product from './component/Product';
import Singelproduct from './component/Singelproduct';
import View_addtocart from './component/View_addtocart';
import ForgetPassword from './profile/ForgetPassword';
import Login from './profile/Login';
import OTPVerification from './profile/OTPVerification';
import RestfPassword from './profile/RestfPassword';
import Singup from './profile/Singup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Order from './component/Order';
import CheckOut from './profile/CheckOut';

import Checkoutaddress from './component/Checkoutaddress';
import Order_view from './component/Order_view';

function App() {
  const [cart,setCart] = useState([])
  return (
    <div className="App">
  <BrowserRouter>
  <Navbar cart={cart}/>
  <Routes>
  <Route path={'/'}  element={<Home/>} />
    <Route path={'/login'}  element={<Login/>} />
    <Route path={'/singup'} element={<Singup/>} />
    <Route path={'/product'} element={<Product/>} />
    <Route path={'/singel/:id'} element={<Singelproduct/>} />
    <Route path={'/viewprofile'} element={<AddingProfile/>} />
    <Route path={'/forgetpassword'}  element={<ForgetPassword/>} />
    <Route path={'/OTPVerification'}  element={<OTPVerification/>} />
    <Route path={'/restfPassword'}  element={<RestfPassword/>} />
    <Route path={'/view_cart'}  element={<View_addtocart/>} />
    <Route path={'/cart'}  element={<Addtocart  />} />
    <Route path={'/order'}  element={<Order  />} />
    <Route path={'/checkout'}  element={<CheckOut  />} />
   <Route path={'/address'} element={<Checkoutaddress/>}/>
   <Route path={'/order-view/:orderId'} element={<Order_view/>}/>















    
  </Routes>
  </BrowserRouter>
    
    </div>
  );
}

export default App;
