import React, {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { getApplicationDetailsById , updateApplication } from '../../api/apiAgent'
import { useAuth } from '../../context-store/AuthContext'
import InfoContainer from '../../Component/petDetails/InfoContainer'
import UserInfoContainer from '../../Component/Util/UserInfoDetails'
import {handleUnauthorizedError} from "../../exception/unAuth"
import Button from 'react-bootstrap/Button';
import { Container  , Row , Col} from 'react-bootstrap'
 



const ApplicationReviewer = () => {

    const[petDetail , setPetDetail] = useState({});
    const[userDetail , setUserDetail] = useState({});
    const[convertedObj , setConvertedObj] = useState({});
    const[status , setStatus] = useState();
    const {applicationId} = useParams();
     
    const {isAuthenticated , role} = useAuth();



    const fetchData = async()=>{

        try{
            const response = await getApplicationDetailsById(applicationId);
            console.log(response.status);
            console.log(response.data)

            if(response.status !== 200)
            {
                console.log("Something wrong with API response");
            }else{
                console.log("API response: " + JSON.stringify(response.data))
                setPetDetail(response.data.pet);
                setUserDetail(response.data.user);
                setStatus(response.data.status);
            }
        }catch(err){
            if(err.status === 401)
            {
                handleUnauthorizedError();
            }else{
                console.log("Application Reviewer data error: " + err)
            }
        }

    }


    const petDetailConverter = (petDetail)=>{

        let obj = {
                "pet_Name": petDetail.name,
                "pet_Serial": petDetail.serial_number,
                "pet_Breed": petDetail.breed,
                "pet_Gender": petDetail.gender,
                "pet_Age": petDetail.age,
                "pet_CaptureDate": petDetail.received_date,
                "pet_Desc": petDetail.pet_description
            }

            return obj;
    }


    useEffect(()=>{
        if(isAuthenticated && role === "ROLE_ADMIN")
        {
            fetchData();
            
        }else{
            console.log("Only logged in admin can review applications.")
        }
    } , [])


    useEffect(()=>{
        setConvertedObj(petDetailConverter(petDetail))
    }, [petDetail , userDetail])



    const rejectBtnClick = async()=>{
        
        if(role !== "ROLE_ADMIN" && isAuthenticated)
            {
                console.log("Reject Error.")
            }else{
                let data = {"status" : 3 , "userId" : localStorage.getItem("loggedInUserId")}
                try{
                    const response  = await updateApplication(applicationId , data);
                    if(response.status !== 200)
                    {
                        console.log("Something wrong with API repsonse.");
                    }else{
                        setStatus(3);
                    }
                }
                catch(err)
                {
                    if(err.status === 401)
                    {
                        handleUnauthorizedError();
                    }else{
                        console.log("API call error: " + err);
                    }
                }

            }

    }

    const approveBtnClick = async()=>{

        if(role !== "ROLE_ADMIN"  && isAuthenticated)
        {
            console.log("Approval Error.")
        }else{
            let data = {"status" : 1 , "userId" : localStorage.getItem("loggedInUserId")}
                try{
                    const response  = await updateApplication(applicationId , data);
                    if(response.status !== 200)
                    {
                        console.log("Something wrong with API repsonse.");
                    }else{
                        setStatus(1);
                    }
                }
                catch(err)
                {
                    if(err.status === 401)
                    {
                        handleUnauthorizedError();
                    }else{
                        console.log("API call error: " + err);
                    }
                }
        }

    }


  return (

    <>
        <h2 style={{textAlign: "center"}}>Details</h2>
        
        <InfoContainer petDetail={convertedObj}/>
        
        <UserInfoContainer userDetail={userDetail}/>

                {
            status === 2 ? (
                <Container style={{marginTop: "1.5rem"}}>
                    <Row>
                        <Col>
                            <Button variant='danger' style={{width: "100%"}} onClick={rejectBtnClick}>Reject</Button>
                        </Col>
                        <Col>
                            <Button variant='success' style={{width: "100%"}} onClick={approveBtnClick}>Approve</Button>
                        </Col>
                    </Row>
                </Container>
            ) : status === 1 ? (
                <Container style={{marginTop: "1.5rem"}}>
                    <Row>
                        <Col>
                            <Button variant='dark' style={{width: "100%"}}>Approved</Button>
                        </Col>
                    </Row>
                </Container>
            ) : status === 3 ? (
                <Container style={{marginTop: "1.5rem"}}>
                    <Row>
                        <Col>
                            <Button variant='dark' style={{width: "100%"}}>Rejected</Button>
                        </Col>
                    </Row>
                </Container>
            ) : null
        }
    
    </>

  )


}

export default ApplicationReviewer