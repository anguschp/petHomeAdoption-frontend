import React from 'react'
import Button from 'react-bootstrap/Button';
import {useFavourList} from '../../context-store/FavourContext';
import { Col , Container , Row , Card} from 'react-bootstrap';
import '../../styles/FavourList.css'



const CardListGrid = ({data}) => {


    const {removePet , refreshFavourList} = useFavourList();

  return (
    
    <>
        <Container>
            <Row xs={1} lg={2} className="g-4">
                {data.map((pet) => (
                    <Card key={pet.pet_id} style={{padding: "0"}}>
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
                ))}
            </Row>
        </Container>
    </>
    
  )
}

export default CardListGrid