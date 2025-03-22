import React from 'react'
import Card from 'react-bootstrap/Card';
import '../../styles/petDetails.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const InfoContainer = ({petDetail}) => {
  return (
    
    <>
        <Card className='detailCard'>
            <Card.Title><h1 className="detailHeader">{petDetail.pet_Name}</h1></Card.Title>
            <Card.Body>
                
            <Container fluid="lg">
                <Row>
                    <Col lg="6" className='detailInnerItem'>
                        <div>Serial No.</div>
                        <p>{petDetail.pet_Serial}</p>
                    </Col>

                    <Col lg="6" className='detailInnerItem'>
                        <div>Breed</div>
                        <p>{petDetail.pet_Breed}</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg="6" className='detailInnerItem'>
                        <div>Gender</div>
                        <p>{petDetail.pet_Gender}</p>
                    </Col>

                    <Col lg="6" className='detailInnerItem'>
                        <div>Age</div>
                        <p>{(petDetail.pet_Age < 1)? "below 1" : petDetail.pet_Age}</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg="12" className='detailInnerItem'>
                        <div>Captured Date</div>
                        <p>{petDetail.pet_CaptureDate}</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg="12" className='detailInnerItem'>
                        <div>Description</div>
                        <p>{petDetail.pet_Desc}</p>
                    </Col>
                </Row>

            </Container>
                

            </Card.Body>
        </Card>

    </>
  )
}

export default InfoContainer