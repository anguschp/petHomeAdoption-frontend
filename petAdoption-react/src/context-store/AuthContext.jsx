import React, { createContext, useContext , useState } from 'react'

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const [userId ,setUserId] = useState('');
    const [username , setUserName] = useState('');

    const authLogin = ()=>{
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated" , true);
    }
    
    const authLogout = ()=>{
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");

    }

    const saveAuthName = (accountUserName)=>{
        setUserName(accountUserName)
    }

    const saveAuthId = (accountId)=>{
        setUserId(accountId)
    }

    const providerContent = {isAuthenticated , authLogin , authLogout , saveAuthName , saveAuthId , userId , username};
    
    
    return(
        <AuthContext.Provider value={providerContent}>
            {children}
        </AuthContext.Provider>
    )


}

