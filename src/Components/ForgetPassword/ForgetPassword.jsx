import React, { useState } from 'react'
import '../ForgetPassword/ForgetPassword.css'
import img1 from '../../Assests/forgetPass.jpg'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        "email": ""
    });
    let navigate = useNavigate();


    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        setLoading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: data.username
                }
            )
        });
        const json = await response.json();
        alert("Password sent to your registered email");
        navigate("/login")
        setLoading(false)
    }

    return (
        <div className='forgetpass-main'>
            <div className="forgetpass-left">
                <div className="signup-heading">Forget Password</div>
                <div className="form-main-forget">
                    <form action="" className='form-content'>
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" className='input-field' placeholder='Enter Your Email' onChange={onChange} required />
                        <div className='btn-signup' onClick={handleClick}>
                            {
                                loading?"Loading...":"Sent Password"
                            }
                            </div>
                    </form>
                </div>
            </div>
            <div className="forgetpass-right">
                <div className="for-img">
                    <img src={img1} alt="" className='forimg' />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword