import React, { createContext, useContext , useState } from 'react'

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return localStorage.getItem("isAuthenticated") === "true";
    });

     // Initialize userId from localStorage
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("loggedInUserId") || null;
    });


    const authLogin = (data)=>{

        console.log(JSON.stringify(data))

        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated" , true);
        setUserId(data.user_Id)
        localStorage.setItem("loggedInUserId" , data.user_Id)
    }
    
    const authLogout = ()=>{
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("loggedInUserId");

    }

    const providerContent = {isAuthenticated , authLogin , authLogout , userId};
    
    
    return(
        <AuthContext.Provider value={providerContent}>
            {children}
        </AuthContext.Provider>
    )


}

