import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css'
import { FaUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';


const Dashboard = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (token) => {
        const tokenResponse = await fetch(`https://creepy-blue-trout.cyclic.app/auth/verification`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'token': token
            }
        });
        console.log(tokenResponse);
        const tokenJson = await tokenResponse.json();
        console.log(token);
        // console.log(tokenJson);
        // const response = await fetch(`https://creepy-blue-trout.cyclic.app/api/user`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token': Cookies.get("token")
        //     }
        // });
        // // console.log(response);
        // const json = await response.json();
        // setData(json.data);
        // console.log(json.data.email);
        // console.log(data);
        setLoading(false)
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if(!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);
        // console.log(data)
    }, []);

    const handleLogout=()=>{
        Cookies.remove('token')
        navigate("/login");
    }

    const handleUpdate=()=>{
        navigate("/update");
    }

    return (

        <div className='dashboard-main'>
            <div className="dash-header">
                <div className="dashitems">
                    User Dashboard
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "white", color: "rgba(255, 123, 0, 0.824)", border: "none" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">My Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleUpdate}>Update Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
            {
                loading ?
                    "Loading"
                    :
                    <div className="dash-body">
                        <h1 className='dash-heading'>My Profile</h1>
                        <div className="dash-main-body">
                            <div className="row1">
                                <div className="item-name">First Name:</div>
                                <div className="item-content">{data.first_name}</div>
                                <div className="item-name">Last Name:</div>
                                <div className="item-content">{data.first_name}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Email:</div>
                                <div className="item-content">{data.email}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Ph-no:</div>
                                <div className="item-content">{data.phone}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Address:</div>
                                <div className="item-content">{data.address}</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Dashboard