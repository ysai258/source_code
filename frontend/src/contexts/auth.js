import React, { createContext, useContext, useEffect, useState } from 'react';
import { INVENTORY_API } from '../constants/constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${INVENTORY_API}/getCurrentUser`, {
        method: 'GET',        
        credentials: 'include',
      });
      const user = await res.json();
      console.log("yash 17",user);
      if(user?.username){
          setCurrentUser(user);
      }
    } catch (err) {
      console.error('Failed to fetch current user:', err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser , fetchCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
}

export {AuthContext, AuthProvider, useAuth};