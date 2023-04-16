import { useAuth } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Profile = () => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    useEffect(() => {
      if (!currentUser) {
        navigate('/login')
      }
    }, [])
    
  return (
    <>
         <div style={{width: 'auto', height: '60px'}}></div>
        <div style={{backgroundColor : '#8aed94', padding:'15px', borderRadius: '5px'}}>
            <button type="button" className="btn btn-info mr-2 mb-2">Logged In User : {currentUser?.username}</button>
        </div>
    </>
  )
}
