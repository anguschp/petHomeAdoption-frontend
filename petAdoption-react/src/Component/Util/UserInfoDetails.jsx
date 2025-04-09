import React from 'react'
import Card from 'react-bootstrap/Card';
import '../../styles/petDetails.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const UserInfoContainer = ({userDetail}) => {
  return (
    
    <>
        <Card className='detailCard'>
            <Card.Title><h1 className="detailHeader">{userDetail.username}</h1></Card.Title>
            <Card.Body>
                
            <Container fluid="lg">
                <Row>
                    <Col lg="6" className='detailInnerItem'>
                        <div>Role</div>
                        <p>{userDetail.role}</p>
                    </Col>

                    <Col lg="6" className='detailInnerItem'>
                        <div>Email</div>
                        <p>{userDetail.email}</p>
                    </Col>
                </Row>

                

            </Container>
                

            </Card.Body>
        </Card>

    </>
  )
}

export default UserInfoContainer