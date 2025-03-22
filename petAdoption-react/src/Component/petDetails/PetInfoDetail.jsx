import React , {  useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getPetById} from "../../api/apiAgent"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PhotoSlide from '../petDetails/PhotoSlide'
import InfoContainer from './InfoContainer';
import '../../styles/petDetails.css'

const PetDetails = () => {
  
  const initialProfile = {
    pet_Id: "",
    pet_Serial: "",
    pet_Name: "",
    pet_Age: "",
    pet_Breed: "",
    pet_Gender: "",
    pet_CaptureDate: "",
    pet_Desc: "",
    pet_Img: []
  }

  let {petId} = useParams(); 
  const[petDetail , setPetDetail] = useState(initialProfile)


  const getPetInfo = async(petId)=>{

    try {

      const response = await getPetById(petId);
      if(response.status === 200)
      {
        setPetDetail({
          pet_Id: response.data.pet_id,
          pet_Serial: response.data.serial_number,
          pet_Name: response.data.name,
          pet_Breed: response.data.breed,
          pet_Age: response.data.age,
          pet_Gender: response.data.gender,
          pet_Desc: response.data.pet_description,
          pet_CaptureDate: response.data.received_date,
          pet_Img: response.data.imageURL
        })

      }else{
        console.log("something went wrong with api")
      }
      
    } catch (error) {
    
      console.log("system error: " + error)
    }

  }

  useEffect(()=>{

    getPetInfo(petId);
  
  }, [petId]);


  return (
    
    <>
    
    <Container fluid>
      <Row>
        <Col lg="6"><PhotoSlide ImageList={petDetail.pet_Img}/></Col>
        <Col lg="6">
          <InfoContainer petDetail={petDetail}/>
          <div style={{textAlign: "center" , margin: "1rem"}}>
            <Button variant="info" className='applyAdoptionBtn' style={{fontWeight: 'bold'}}>Add to favour list</Button>
          </div>
        </Col>
      </Row>
      
    </Container>
      
    
    </>

  )
}

export default PetDetails