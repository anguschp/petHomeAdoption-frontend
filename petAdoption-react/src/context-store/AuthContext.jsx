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

    const[role , setRole] = useState(
        ()=>{
            return localStorage.getItem("role") || null;
        }
    )

    const authLogin = (data)=>{

        console.log(JSON.stringify(data))

        setIsAuthenticated(true);
        setUserId(data.user_Id);
        setRole(data.assigned_role[0].authority)

        localStorage.setItem("isAuthenticated" , true);
        localStorage.setItem("loggedInUserId" , data.user_Id)
        localStorage.setItem("role" , data.assigned_role[0].authority)
    }
    
    const authLogout = ()=>{
        setIsAuthenticated(false);
        setUserId(null)
        setRole(null)
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("loggedInUserId");
        localStorage.removeItem("role");


    }

    const providerContent = {isAuthenticated , authLogin , authLogout , userId , role};
    
    
    return(
        <AuthContext.Provider value={providerContent}>
            {children}
        </AuthContext.Provider>
    )


}

