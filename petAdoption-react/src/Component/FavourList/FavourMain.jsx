import React from 'react'
import { useAuth } from '../../context-store/AuthContext'
import {useFavourList} from '../../context-store/FavourContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/FavourList.css'



const FavourMain = () => {

    const {favourPet , removePet} = useFavourList();
    //console.log("checl favourPet" + JSON.stringify(favourPet));

    const {isAuthenticated , username , userId} = useAuth();
    console.log("FavourMain: " + userId);


  return (
    <>
        {isAuthenticated?(
            
            <>
                <h3 style={{textAlign: 'center'}}>Your favour list</h3>

                {
                    favourPet.map((pet)=>{
                        return(
                            <Card>
                            <Card.Body>
                              <Card.Title className='NameHeader'><h3>{pet.petName}</h3></Card.Title>
                              <Card.Text>
                                <div>Age: {pet.age}</div>
                              </Card.Text>
                              <Card.Text>
                                <div>Gender: {pet.gender}</div>
                              </Card.Text>
                              <Card.Text>
                              <div>Breed: {pet.breed}</div>
                              </Card.Text>
                              <Button variant="primary" onClick={()=>{removePet(pet.pet_id)}}>Remove</Button>
                            </Card.Body>
                          </Card>
                        )
                    })
                }

                <div style={{textAlign: "center"}}>
                    <Button variant="warning" className='submitBtn'>Submit Application</Button>
                </div>

            </>

        ):(
            <div>Please go to login</div>
        )}
    
    </>
  )
}

export default FavourMain