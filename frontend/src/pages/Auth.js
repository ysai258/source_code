import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css'
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { Alert, message, Spin } from 'antd';

const Auth = () => {

 const [isLogIn , setIsLogin] = useState(true);
 const [userName, setUserName] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const [messageApi, contextHolder] = message.useMessage();
 const [isLoading, setIsLoading] = useState(false);
 
const handleLogin = (event) => {
    setIsLogin(event);
    setErrorMessage('');
}

const handleSetErrorMessage = (newValue) => {
    setErrorMessage(newValue);
};

const handleLoading = (newValue) => {
    setIsLoading(newValue);
};



const success = () => {
    messageApi.open({
        type: 'success',
        content: 'Success',
    });
}

  return (
    <div className='formStyles'>
        {contextHolder}
        {errorMessage.length>0 && 
            <>           
                <div style={{width: 'auto', height: '20px'}}></div>
                <Alert message={errorMessage} type="warning" showIcon />
            </>
        }

        {isLoading  && <Spin size="large"/>}
        <div style={{width: 'auto', height: '60px'}}></div>

        <button type="button" onClick={ () => handleLogin(true) } className="btn btn-info mr-2 mb-2">Log In</button>
        <button type="button" onClick={ () => handleLogin(false) } className="btn btn-success ml-2 mb-2">Sign Up</button>
        <input type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" onChange={(e) => setUserName(e.target.value)}/>
        <input type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" onChange={(e) => setPassword(e.target.value)}/>
        { isLogIn && <Login username = {userName} password = {password} successMessage = { success } errorMessage = { handleSetErrorMessage } isLoading = { handleLoading } /> }
        { !isLogIn && <Signup username = {userName} password = {password}  successMessage = { success } errorMessage = { handleSetErrorMessage } isLoading = { handleLoading } /> }
    </div>
  )
}

export default Auth