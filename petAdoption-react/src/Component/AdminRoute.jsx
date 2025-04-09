import React from 'react'
import { useAuth } from '../context-store/AuthContext'
import { Route, Navigate } from 'react-router-dom'


export const AdminRoute = ({children}) => {

    const{isAuthenticated , role} = useAuth();
    if(!isAuthenticated && role !== "ROLE_ADMIN"){
        return <Navigate to="/loginpage"/>
    }
    else{

        return children;
        
    }
}
