import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addtocart from './Addtocart';
import '../style/Singelproduct.css'


const Singelproduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/get_singel_product/${id}`);
                setProduct(response.data);
                setLoading(false);
                if (response.data) {
                 
                   if (isLoggedIn) {
                    toast.error('Please login to add to cart');
                    } else {
            
                //  toast.success("user login")
                       
                    }
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            // Cleanup code, if any
        };
    }, [id, isLoggedIn]); 


    

    return (
        <div className="single-product">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : null}
            {product && (
                <div className="product-details">
                    <img src={`http://localhost:4000/${product.image[0]}`} alt="Product" />
                    <h2>Name: {product.productname}</h2>
                    <p>Description: {product.descripation}</p>
                    <p>Price: {product.price}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Stock: {product.stock}</p> 
                   <Addtocart/> 
                 
                </div>
            )}
              {/* <Order/> */}
              {/* <CheckOut/> */}
             {/* <ToastContainer/> */}

             <footer className="bg-light text-center">
  <div className="container p-4">
    <section className="mb-4">
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#3b5998"}} href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#55acee"}} href="#!" role="button"><i className="fab fa-twitter"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#dd4b39"}} href="#!" role="button"><i className="fab fa-google"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#ac2bac"}} href="#!" role="button"><i className="fab fa-instagram"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#0082ca"}} href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#333333"}} href="#!" role="button"><i className="fab fa-github"></i></a>
    </section>

    <section className="">
      <form action="">
        <div className="row d-flex justify-content-center">
          <div className="col-auto">
            <p className="pt-2">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>
          <div className="col-md-5 col-12">
            <div className="form-outline mb-4">
              <input type="email" id="form5Example2" className="form-control" />
              <label className="form-label" htmlFor="form5Example2">Email address</label>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-4">Subscribe</button>
          </div>
        </div>
      </form>
    </section>

    <section className="mb-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.
      </p>
    </section>

    <section className="">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
</footer>

        </div>
    );
};

export default Singelproduct;
