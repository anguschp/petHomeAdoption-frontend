import React , {useEffect} from 'react'
import { useAuth } from '../../context-store/AuthContext'
import {useFavourList} from '../../context-store/FavourContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/FavourList.css'
import {submitApplicationAPI} from '../../api/apiAgent'
import {handleUnauthorizedError} from  '../../exception/unAuth'
import { useNavigate } from 'react-router-dom';



const FavourMain = () => {

    const navigate = useNavigate();
    
    const {favourPet , removePet} = useFavourList();
    //console.log("checl favourPet" + JSON.stringify(favourPet));

    const {isAuthenticated , username , userId} = useAuth();
    console.log("FavourMain: " + userId);


    const ApplicationSubmit = async()=>{
        console.log("Triggered pet [ApplictionSubmit]")        
        try{

            const response = await submitApplicationAPI(userId);
            if(response.status !== 201)
            {
                console.log("API response problem")
            }else{
                console.log("Application submitted")
            }

            console.log('a')

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
        <h3 style={{ textAlign: 'center' }}>Your favourite list</h3>

                {favourPet && favourPet.length > 0 ? (
                favourPet.map((pet) => (
                    <Card key={pet.pet_id}>
                    <Card.Img variant="top" src={pet.imageSingleURL} style={{maxWidth: "700px", margin: "auto"}}/>
                    <Card.Body style={{textAlign: "center"}}>

                        <Card.Title className='NameHeader' style={{margin: "auto"}}><h3>{pet.petName}</h3></Card.Title>
                        <Card.Text>
                        <div>Age: {pet.age}</div>
                        </Card.Text>
                        <Card.Text>
                        <div>Gender: {pet.gender}</div>
                        </Card.Text>
                        <Card.Text>
                        <div>Breed: {pet.breed}</div>
                        </Card.Text>

                        <div>
                            <Button variant="danger" onClick={() => { removePet(pet.pet_id) }} className='removeBtn'>Remove</Button>
                        </div>
                    </Card.Body>
                    </Card>
                ))
                ) : (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    No pets in your favourites list
                </div>
                )}

                {favourPet && favourPet.length > 0 && (
                <div style={{ textAlign: "center" }}>
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