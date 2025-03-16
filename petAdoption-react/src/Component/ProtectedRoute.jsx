import React from 'react'
import { useAuth } from '../context-store/AuthContext'
import { Route, Navigate } from 'react-router-dom'


export const ProtectedRoute = ({children}) => {

    const{isAuthenticated} = useAuth();
    if(!isAuthenticated){
        return <Navigate to="/loginpage"/>
    }
    else{

        return children;
        
    }
}
