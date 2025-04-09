import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "../../styles/Login.module.css";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useAuth} from "../../context-store/AuthContext.jsx";
import { loginRquest } from "../../api/apiAgent.js";


    
const LoginPage = ()=>{


    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [showerror , setError] = useState("");
    const navigate = useNavigate();
    const {authLogin}  = useAuth();


    const handleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);

    }


    const loginButtonHandler = async ()=>{

        setError("");
      

        const loginData = new URLSearchParams();
        loginData.append("username", username);
        loginData.append("password", password);

        try{
            const response = await loginRquest(loginData);
            console.log(response);
            console.log(response.headers);
            if(response.status === 200){
                console.log("Login successful");
                authLogin(response.data);
                navigate("/");
                }
                else{
                    const returnError = await response.json();
                    console.log(returnError);
                }
            }
        catch(error){
            console.log(error);
            setError("An erro occured, please try again");
            console.log("Error: " + showerror);
        }
    }


    return(

        <>
            <div className={style.loginBackground}>

                <Card className={style.loginCardContainer}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <hr/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: "left"}}>                        
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="email" placeholder="Username" onChange={handleUsernameChange}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: "left"}}>
                            <Form.Label >Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        <Button variant="primary" onClick={loginButtonHandler}>
                            Login
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                    
                    
            </div>

        
        </>
        


    )
}

export default LoginPage;