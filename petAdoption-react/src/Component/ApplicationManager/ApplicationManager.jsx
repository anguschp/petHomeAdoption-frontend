import React, { useEffect, useState } from 'react'
import {useAuth} from "../../context-store/AuthContext"
import {fetchAllApplications} from '../../api/apiAgent'
import {handleUnauthorizedError} from "../../exception/unAuth"
import { useNavigate  , Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import "../../styles/petApplication.css"
import Container from 'react-bootstrap/esm/Container'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons'






const ApplicationManager = () => {

  const navigate = useNavigate()
  const {isAuthenticated , role , userId} = useAuth();
  const [dataList , setDataList] = useState([])
  const [listCriteria , setListCriteria] = useState({
    status: null,
    orderSeq: 1
  })



  const fetchData = async()=>{
    try{
      const response = await fetchAllApplications(listCriteria);
      if(response.status !== 200)
      {
        console.log("Something went wrong with API response")
      }
    
      if(response.data.length === 0)
      {
        return [];
      }

      console.log("API response: " + JSON.stringify(response.data));
      return response.data
    }
    catch(err)
    {
      console.log("Error occur when fetching applications");
      console.log(err);
      if(err.status === 401)
      {
        handleUnauthorizedError(navigate)
      }
    }
  }


  useEffect(()=>{
    if(isAuthenticated && role === "ROLE_ADMIN")
    {    
     
      const loadData = async () => {
        try {
          const result = await fetchData(listCriteria);
          console.log("Fetched data:", result);
          setDataList(result)
        } catch (error) {
          console.error("Failed to load applications:", error);
        }
      };
      
      loadData();


    }else{
      console.log("Only system admin can fatch all applications")
    }
  } , [listCriteria])



  const handleStatusChange = (e)=>{
    setListCriteria(prev =>({
      ...prev,
      status: e.target.value === ""? null :  parseInt(e.target.value)
    }))
  }
  

  const handleSortBtnClick = ()=>{
    setListCriteria(prev =>({
      ...prev,
      orderSeq: prev.orderSeq === 1? -1 : 1
    }))
  }

  return (
    <>
    <div className='petListContainer'>

    <Container>
      <Row>
      </Row>
    </Container>


    <Container>
      <Row >
        <Col xs={9} style={{paddingLeft: "0"}}>
        <Form.Select aria-label="Default select example" onChange={handleStatusChange}>
          <option value="">Status</option>
          <option value="2">Pending</option>
          <option value="3">Rejected</option>
          <option value="1">Approved</option>
        </Form.Select>
        </Col>
        <Col xs={3}>
          <Button variant='primary' onClick={handleSortBtnClick}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </Button>
        </Col>
      </Row>
    </Container>
    

    {

      Array.isArray(dataList) && dataList.length !== 0?
      (
        dataList.map((data)=>{
          return(
            
      <Card as={Link} to={`/application/${data.application_id}`} key={dataList.apply_no}>
                <Card.Body >
                  <Row >
                   <Col style={{textAlign: "left"}}><strong>Application No.</strong></Col>
                   <Col style={{textAlign: "left"}}>{data.apply_no}</Col>
                  </Row>
                  <Row>
                   <Col style={{textAlign: "left"}}><strong>Pet Name</strong></Col>
                   <Col style={{textAlign: "left"}}>{data.pet_name}</Col>
                  </Row>
                  <Row>
                   <Col style={{textAlign: "left"}}><strong>Apply date</strong></Col>
                   <Col style={{textAlign: "left"}}>{data.created_date}</Col>
                  </Row>
                  <Row>
                   <Col style={{textAlign: "left"}}><strong>Status</strong></Col>
                   <Col style={{textAlign: "left"}}>{data.applyStatus_name}</Col>
                  </Row>
                </Card.Body>
              </Card>
          )
        })
      ):(
        <p>No application record</p>
      )   
}


    </div>
    
    </>
  )
}

export default ApplicationManager