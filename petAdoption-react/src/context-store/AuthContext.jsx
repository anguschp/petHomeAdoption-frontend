import React, { createContext, useContext , useState } from 'react'

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const authLogin = ()=>{
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated" , true);
    }
    
    const authLogout = ()=>{
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    }

    const providerContent = {isAuthenticated , authLogin , authLogout};
    
    
    return(
        <AuthContext.Provider value={providerContent}>
            {children}
        </AuthContext.Provider>
    )


}

