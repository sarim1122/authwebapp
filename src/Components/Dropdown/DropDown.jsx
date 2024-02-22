import React from 'react'
import '../Dashboard/Updatedash.css'
import { FaUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const Dropdown = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token')
        navigate("/login");
    }
    return (

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "white", color: "rgba(255, 123, 0, 0.824)", border: "none" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={()=>{navigate("/")}}>My Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=>{navigate("update")}}>Update Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
           
    )
}

export default Dropdown