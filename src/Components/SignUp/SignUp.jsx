import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import img1 from '../../Assests/SignUpimg1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';



const SignUp = () => {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const [data, setData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone": "",
        // "username":"",
        "password": "",
    });

    const handleClick = async () => {
        setLoading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    address: data.address
                }
            )
        });
        const json = await response.json();
        if(response.status === 200 && json.token) 
        {
            Cookies.set("token",json.token);
        }
        else
        {
            alert(json.msg)
        }
        navigate("/")
        setLoading(false)
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className='signup-main'>
            <div className="signup-left">
                <div className="signup-heading">Sign Up</div>
                <div className="form-main">
                    <form action="" className='form-content'>
                        {/* <div className="row1"> */}
                        <label htmlFor="">First Name</label>
                        <input onChange={onChange} type="text" name='first_name' className='input-field' placeholder='Enter your First Name' required />
                        <label htmlFor="">Last Name</label>
                        <input onChange={onChange} type="text" name="last_name" className='input-field' placeholder='Enter your Last Name' required />
                        {/* </div> */}
                        <label htmlFor="">Email</label>
                        <input onChange={onChange} type="text" name="email" className='input-field' placeholder='Enter Your Email' required />
                        <label htmlFor="phone">Ph-No</label>
                        <input onChange={onChange} type="tel" name="phone" className='input-field' placeholder='Enter your Ph-no' required />
                        <label htmlFor="">Address</label>
                        <textarea onChange={onChange} name="address" className='input-field' required />
                        {/* <label htmlFor="">Username</label>
                        <input onChange={onChange} type="text" name="username" className='input-field' placeholder='Enter Username' required/> */}
                        <label htmlFor="Password">Password</label>
                        <input onChange={onChange} type="password" name="password" className='input-field' placeholder='Enter password' required />
                        <div className='btn-signup' onClick={handleClick}>
                            {
                                loading?"Loading..":"Sign Up"
                            }</div>
                        <span>
                            Already have an account <Link to="/login">Login</Link>
                        </span>
                    </form>
                </div>

            </div>
            
        </div>
    )
}

export default SignUp