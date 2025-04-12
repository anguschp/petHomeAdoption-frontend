import React , {useEffect} from 'react'
import { useAuth } from '../../context-store/AuthContext'
import {useFavourList} from '../../context-store/FavourContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/FavourList.css'
import {submitApplicationAPI} from '../../api/apiAgent'
import {handleUnauthorizedError} from  '../../exception/unAuth'
import { useNavigate } from 'react-router-dom';
import CardListGrid from './CardListGrid'



const FavourMain = () => {

    const navigate = useNavigate();
    
    const {favourPet , removePet , refreshFavourList} = useFavourList();
    //console.log("checl favourPet" + JSON.stringify(favourPet));

    const {isAuthenticated , userId} = useAuth();
    console.log("FavourMain: " + userId);


    const ApplicationSubmit = async()=>{
        console.log("Triggered pet [ApplictionSubmit]")        
        try{

            const response = await submitApplicationAPI(userId);
            if(response.status !== 200)
            {
                console.log("API response problem")
            }else{
                console.log("Application submitted")
                refreshFavourList();
            }


        }catch(err)
        {

            if(err.status === 401)
            {
                handleUnauthorizedError(navigate);
            }else{
                console.log("Error occur when submitting adopt applcation")
            }
        }

    }


  return (
    <>
        {isAuthenticated?(
            
            <>
            <h2 style={{ textAlign: 'center' , fontWeight: "bold", marginBottom: "2rem"}}>Your Favour List</h2>

                {favourPet && favourPet.length > 0 ? (
                
                    <CardListGrid data={favourPet}/>
                    
                ) : (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    No pets in your favour list
                </div>
                )}

                {favourPet && favourPet.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                    <Button variant="warning" className='submitBtn' onClick={ApplicationSubmit}>
                    Submit Application
                    </Button>
                </div>
                )}
            </>

        ):(
            <div>Please go to login</div>
        )}
    
    </>
  )
}

export default FavourMain