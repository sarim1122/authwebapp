import React, { useEffect, useState } from 'react'
import '../Dashboard/Updatedash.css'
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dropdown from '../Dropdown/DropDown';



const UpdateDash = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [uloading, setUloading] = useState(false);



    const fetchData = async (token) => {
        setLoading(true)

        const tokenResponse = await fetch(`https://employee-app-3tf1.onrender.com/auth/verification`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'token': token
            }
        });
        if (tokenResponse.status === 200) {

            const tokenJson = await tokenResponse.json();
            const response = await fetch(`https://employee-app-3tf1.onrender.com/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookies.get("token")
                }
            });
            const json = await response.json();
            setData(json.data);
        }
        else{
            navigate("/login")
        }
        setLoading(false)

    }



    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdate = async () => {
        setUloading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/api/user/edit`, {
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
        if(response.status==200) navigate("/")
        setUloading(false)
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);
    }, []);


    return (
        <div className='update-dash'>

            <div className="dash-header">
                <div className="dashitems">
                    User Dashboard
                </div>
                <Dropdown/>
            </div>
            {
                loading ?
                "loading"
                :
                <>
                <div className="update-dash-main">
                <h1 className='dash-heading'>Update User's Details</h1>
                <form action="" className='form-body'>
                    <label htmlFor="" className='up-label'>First Name</label>
                    <input value={data.first_name} onChange={onChange} type="text" name='first_name' className='up-input-field' placeholder='Enter your First Name' required />
                    <label htmlFor="" className='up-label'>Last Name</label>
                    <input type="text" name="last_name" value={data.last_name} onChange={onChange} className='up-input-field' placeholder='Enter your Last Name' required />
                    
                    <label htmlFor="" className='up-label'>Email</label> 
                    <input type="text" name="email" value={data.email} className='up-input-field' onChange={onChange} placeholder='Enter Your Email' required />
               
                    <label htmlFor="phone" className='up-label'>Ph-No</label>
                    <input type="tel" name="phone" value={data.phone} onChange={onChange} className='up-input-field' placeholder='Enter your Ph-no' required />
                    <label htmlFor="" className='up-label'>Address</label>
                    <textarea className='up-input-field' name='address' value={data.address} onChange={onChange} required />
                </form>
            </div>
            <button className="button-update" onClick={handleUpdate}>
                {
                    uloading?
                    "Loading ..."
                    :
                    "Update"
                }
                </button>
                </>
            }
        </div>
    )
}

export default UpdateDash