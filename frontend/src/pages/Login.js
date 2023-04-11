import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css'
import { INVENTORY_API } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';


const Login = (props) => {
  const {fetchCurrentUser} = useAuth();
  const navigate = useNavigate();
  const handleLogin = async(event) => {
    event.preventDefault();
    const username = props.username.trim();
    const password = props.password.trim();
    if (username.length === 0 || password.length === 0) {
      props.errorMessage('Username and Password is required');
    } else {
        props.isLoading(true);
        const res = await fetch(`${INVENTORY_API}/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username":username,"password":password}),
            credentials:"include",
          });
          if(res.ok){
            props.errorMessage('');
            props.successMessage();
            navigate('/');
            fetchCurrentUser();
        } else {
          console.log(res.message);
          props.errorMessage('Something Went Wrong');
        }
        props.isLoading(false);
    }
  }
  const logOut = async ()=>{
    const res = await fetch(`${INVENTORY_API}/logout`,{
      method: "POST",
    });
    const data= await res.json();
    console.log("yash 41",data);
  }

  return (
    <div>
         <button className="btn btn-info mb-2" onClick={ handleLogin }>Log In</button>
         <button className="btn btn-info mb-2" onClick={ logOut }>Log out</button>
         
    </div>
  )
}

export default Login