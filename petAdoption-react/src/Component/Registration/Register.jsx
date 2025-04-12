import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "../../styles/Login.module.css";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {registerRequestAPI} from "../../api/apiAgent";
import { useNavigate } from "react-router-dom";


    
const RegisterPage = (headerHeight)=>{


    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [username , setUsername] = useState("");
    const [error , setError] = useState({});
    const navigate = useNavigate();


    const handleEmailChange = (e)=>{
        console.log(email);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        console.log(password);
        setPassword(e.target.value);
    }

    const handleUsernamechange = (e)=>{
        console.log(username);
        setUsername(e.target.value);
    }


    const registerButtonHandler = async ()=>{
        
        let formData = {email: email , password: password , username: username};
       
            try{

                const response = await registerRequestAPI(formData);
                console.log(response.data);
                console.log(JSON.stringify(response.data));
                navigate("/registerSuccess");
                //console.log("Response status code: " + response.status + " body: " + jsonResponse);

            }
            catch(ex){
                console.log
                console.log(ex.status);
                console.log(ex.response.data);
                setError(ex.response.data);
                console.log("Error: " + JSON.stringify(error));
            }

    
    }


    return(

        <>
            <div className={style.loginBackground} style={{minHeight: `calc(100vh - ${headerHeight.props}px)` , background: "linear-gradient(135deg, rgb(174, 82, 28), rgb(98, 57, 201))"}} >

                <Card className={style.loginCardContainer}>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <hr/>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: "left"}}>                        
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter username" onChange={handleUsernamechange}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: "left"}}>                        
                            <Form.Label >Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: "left"}}>
                            <Form.Label >Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        
                        
                        <Button variant="primary" onClick={registerButtonHandler}>Register</Button>
                    </Form>
                    </Card.Body>
                </Card>
                    
                    
            </div>

        
        </>
        


    )
}

export default RegisterPage;