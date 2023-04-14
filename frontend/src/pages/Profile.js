import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { INVENTORY_API } from '../constants/constants';

export const Profile = () => {
    const [username, setUserName] = useState('');
    const fetchCurrentUser = async () => {
        try {
          const res = await fetch(`${INVENTORY_API}/getCurrentUser`, {
            method: 'GET',        
            credentials: 'include',
          });
          const user = await res.json();
    
        console.log(user.user);
          if(user?.user.username){
            setUserName(user.user.username);
          }
        } catch (err) {
          navigate('/login')
          console.error('Failed to fetch current user:', err);
        }
    };
    
    const navigate = useNavigate();
    useEffect(() => {
      return () => {
        fetchCurrentUser(); 
      }
    }, [])
  return (
    <>
         <div style={{width: 'auto', height: '60px'}}></div>
        <div style={{backgroundColor : '#8aed94', padding:'15px', borderRadius: '5px'}}>
            <button type="button" className="btn btn-info mr-2 mb-2">Logged In User : {username}</button>
        </div>
    </>
  )
}
