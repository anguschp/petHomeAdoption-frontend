import React from 'react'
import { useAuth } from '../../context-store/AuthContext'



const FavourMain = () => {


    const {isAuthenticated , username} = useAuth();


  return (
    <>
        {isAuthenticated?(
            
            <>
                <h3 style={{textAlign: 'center'}}>{username} favour list</h3>



            </>

        ):(
            <div>Please go to login</div>
        )}
    
    </>
  )
}

export default FavourMain