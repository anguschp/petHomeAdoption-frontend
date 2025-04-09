import React, { useEffect , useState } from 'react'
import { useAuth } from '../../context-store/AuthContext'
import {fetchUserApplications} from '../../api/apiAgent'
import {handleUnauthorizedError} from '../../exception/unAuth'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock , faCheck , faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom'; 
import "../../styles/dashboard.css"


function Dashboard() {

  const [sorting, setSorting] = useState({sortBy: 1 , orderSeq: 1});
  const {isAuthenticated, userId} = useAuth();
  const [records , setRecords] = useState([]);
  const [pendings , setPendings] = useState([]);
  const [apporves , setApproves] = useState([]);
  const [rejects , setRejects] = useState([]);

  const navigate = useNavigate();

  const loadDataFromDB = async()=>{
    try{
      const response = await fetchUserApplications(userId , sorting);
      if(response.status !== 200)
      {
        console.log("something went wrong for api response")
      }
      else{

        console.log("Application records:" + JSON.stringify(response.data))
        setRecords(response.data);
    }

    }catch(err){
      console.log("Error occur: " + err)
      if(err.status === 401)
      {
        handleUnauthorizedError(navigate);
      }
    }

  }


  useEffect(()=>{

    if(records !== null || records.length > 0)
      {
        console.log(records)
        setPendings(records.filter((r)=>{return parseInt(r.applyStatus)  === 2}))
        setApproves(records.filter((r)=>{return parseInt(r.applyStatus) === 1}))
        setRejects(records.filter((r)=>{return parseInt(r.applyStatus) === 3}))
    }
  } , [records])


  const handleSortingChange = (e)=>
  {
    console.log(e.target.value);
    setSorting(prev=>({
      ...prev,
      sortBy: parseInt(e.target.value)
    }))
  }

  const toggleOrder = ()=>{
    console.log(sorting.orderSeq);
    setSorting(prev => ({
      ...prev,
      orderSeq: prev.orderSeq === 1 ? -1 : 1
    }));
  }


  useEffect(()=>{

    loadDataFromDB();

  } , [])




  return (
    <>
        <div>
          <h3 style={{textAlign: "center"}}><b>Your Application(s)</b></h3>
        </div>


        <br>
        </br>

        <Container>
          <Row fluid style={{marginBottom: "2em"}}>
            <h3 className='statusHead'><FontAwesomeIcon icon={faClock} style={{marginRight: "1rem"}}/>Pending</h3>
            <>
            {
              pendings.length === 0?
              (
                <p>No Pending Record</p>
              )
              :
              (
                pendings.map((r)=>{
                return(
                  <Card>
                    <Card.Body>
                    <Container>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Apply No.</Col>
                        <Col xs={8}>{r.apply_no}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Pet Name</Col>
                        <Col xs={8}>{r.pet_name}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Application Date</Col>
                        <Col xs={8}>{r.created_date}</Col>
                      </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                )
                })
              )
            }
            </>
            </Row>


          <Row fluid style={{marginBottom: "2em"}}>
            <h3 className='statusHead'><FontAwesomeIcon icon={faCheck} style={{marginRight: "1rem"}}/>Approved</h3>
            <>
            {
              apporves.length === 0?
              (
                <p>No Approved Record</p>
              )
              :
              (
                apporves.map((r)=>{
                return(
                  <Card>
                    <Card.Body>
                    <Container>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Apply No.</Col>
                        <Col xs={8}>{r.apply_no}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Pet Name</Col>
                        <Col xs={8}>{r.pet_name}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Application Date</Col>
                        <Col xs={8}>{r.created_date}</Col>
                      </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                )
                })
              )
            }
            </>
          </Row>

          <Row fluid style={{marginBottom: "2em"}}>
            <h3 className='statusHead'><FontAwesomeIcon icon={faCircleXmark} style={{marginRight: "1rem"}}/>Rejected</h3>
            <>
            {
              rejects.length === 0?
              (
                <p>No Rejected Record</p>
              )
              :
              (
                rejects.map((r)=>{
                return(
                  <Card>
                    <Card.Body>
                    <Container>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Apply No.</Col>
                        <Col xs={8}>{r.apply_no}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Pet Name</Col>
                        <Col xs={8}>{r.pet_name}</Col>
                      </Row>
                      <Row>
                        <Col xs={4} style={{fontWeight: "bold"}}>Application Date</Col>
                        <Col xs={8}>{r.created_date}</Col>
                      </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                )
                })
              )
            }
            </>
          </Row>
        </Container>


    </>
    

  )
}

export default Dashboard