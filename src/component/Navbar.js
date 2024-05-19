import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = ({cart}) => {
  const isAuthenticated = Cookies.get('token') !== undefined;
  const [cartCount, setCartCount] = useState(0);
  // const [cart,setCart] = useState([])

  const handleLogout = () => {
    // Clear the token cookie or perform any other necessary logout actions
    Cookies.remove('token');
    // Redirect the user to the login page or any other desired page
    window.location.href = '/login';
  };


  useEffect(() => {

  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"></a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={'/'}>Home</Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-link" to={'/viewprofile'} onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/singup'}>Signup</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to={'/product'}>Product</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={'/cart'}>
                <button type="button" class="btn btn-primary">
                  <FaCartArrowDown style={{fontSize:"2rem"}}/>{cart?.length}  <span class="badge badge-light">{cart?.count}</span>
                  <span class="sr-only">unread messages</span>
                </button>
                {/* <button onClick={() => setCartCount((cartCount))} className="cart-count">{cartCount}</button  > */}
              </Link>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" style={{ width: '20%', padding: "7px" }} type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
