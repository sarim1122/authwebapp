import React from 'react'
import '../ForgetPassword/ForgetPassword.css'
import img1 from '../../Assests/forgetPass.jpg'

const ForgetPassword = () => {
    return (
        <div className='forgetpass-main'>
            <div className="forgetpass-left">
                <div className="signup-heading">Forget Password</div>
                <div className="form-main-forget">
                    <form action="" className='form-content'>
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" className='input-field' placeholder='Enter Your Email' required />
                        <button className='btn-signup'>Sent Password</button>
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