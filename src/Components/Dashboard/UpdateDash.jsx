import React, { useEffect, useState } from 'react'
import '../Dashboard/Updatedash.css'
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const UpdateDash = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Runs only on the first render
        fetchData();
        console.log(data)
    }, []);

    const fetchData = async () => {
        const response = await fetch(`https://creepy-blue-trout.cyclic.app/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': Cookies.get("token")
            }
        });
        // console.log(response);
        const json = await response.json();
        setData(json.data);
        // console.log(json.data.email);
        console.log(json);
        setLoading(false)
    }



    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdate = async () => {
        const response = await fetch(`https://creepy-blue-trout.cyclic.app/api/user/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': Cookies.get("token")
            },
            body: JSON.stringify(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                }
            )
        });
        // console.log(data);
        const json = await response.json();
        console.log(json);
    }


    return (
        <div className='update-dash'>

            <div className="dash-header">
                <div className="dashitems">
                    User Dashboard
                </div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "white", color: "rgba(255, 123, 0, 0.824)", border: "none" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser />
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">My Profile</a></li>
                        <li><a class="dropdown-item" href="#">Update Profile</a></li>
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
            {
                loading ?
                "loading"
                :
                <>
                <div className="update-dash-main">
                <h1 className='dash-heading'>Update User's Details</h1>
                <form action="" className='form-body'>
                    <label htmlFor="">First Name</label>
                    <input value={data.first_name} onChange={onChange} type="text" name='first_name' className='input-field' placeholder='Enter your First Name' required />
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="last_name" value={data.last_name} onChange={onChange} className='input-field' placeholder='Enter your Last Name' required />
                    
                    <label htmlFor="">Email</label> 
                    <input type="text" name="email" value={data.email} className='input-field' onChange={onChange} placeholder='Enter Your Email' required />
               
                    <label htmlFor="phone">Ph-No</label>
                    <input type="tel" name="phone" value={data.phone} onChange={onChange} className='input-field' placeholder='Enter your Ph-no' required />
                    <label htmlFor="">Address</label>
                    <textarea className='input-field' name='address' value={data.address} onChange={onChange} required />
                </form>
            </div>
            <button className="button-update" onClick={handleUpdate}>Update</button>
                </>
            }
        </div>
    )
}

export default UpdateDash