import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../styles/petListContainer.css"
import { Link } from 'react-router-dom';


const PetListContainer = ({petData}) => {


  return (
    <>

        <h2 style={{textAlign: 'center'}}>Cats currently available</h2>

        <div className='cardBoxContainer'>
              {petData?.length > 0 ? (
                // Show cards when there's data
                petData.map((pet) => (
                  <div className="cardBox" key={pet.pet_id}>
                    <Card as={Link} to={`/pet/${pet.pet_id}`}>
                      <Card.Img 
                        variant="top" 
                        src={pet.imageURL?.[0] || '/default-image.jpg'} 
                        style={{ maxHeight: "220px", objectFit: "cover" }}
                        alt={pet.name}
                      />
                      <Card.Body>
                        <Card.Title style={{ textDecoration: "none" }} className='cardNameTag'>{pet.name}</Card.Title>
                        <Row>
                          <Col>Age: {pet.age || "below 1"}</Col>
                          <Col>{pet.breed }</Col>
                          <Col>{pet.gender}</Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                // Show message when no data
                <div className="no-results-message">
                  <h3>No record(s)</h3>
                </div>
              )}
          </div>

    </>
   
  )
}

export default PetListContainer