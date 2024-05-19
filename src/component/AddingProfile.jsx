import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddingProfile = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null); // Use null instead of an empty string for file upload

    useEffect(() => {
        const profileUpdate = async () => {
            try {
             const token = Cookies.get('token')
             let headers = {
                'token':token
             }
                const response = await axios.get('http://localhost:4000/get_singel_user', { headers:headers});
                console.log('Response:', response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        profileUpdate();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('photo', photo); // Append the File object directly
            const token = Cookies.get('token')
            let headers = {
                'token':token
            }
            const response = await axios.put('http://localhost:4000/update_user', formData, { headers:headers });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Full Name" /> <br /><br />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" /> <br /><br />

                <label htmlFor="phone">Phone</label>
                <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" /> <br /><br />

                <label htmlFor="photo">Image</label>
                <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} /> <br /><br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default AddingProfile;
