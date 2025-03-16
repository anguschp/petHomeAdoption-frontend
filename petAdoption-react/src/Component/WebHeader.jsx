import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from "../styles/WebHeader.module.css"
import logo from "../assets/mainLogo.png"
import {Link} from "react-router-dom"
import { useAuth } from '../context-store/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import {logoutRequestAPI} from '../api/apiAgent.js';





const WebHeader = () => {



  
  const {authLogout , isAuthenticated} = useAuth();
  const navigate = useNavigate();


  const logOutHandler = async()=>{

    try{

      const response = await logoutRequestAPI();
      if(response.status === 200){
        authLogout();
        navigate("/");
      }
    }catch(error){
      console(error)
      console.log("An error occured while logging out");
    }
   
    
  }


    return (

    <>
    <header>

    {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className={style.webheaderStyle + " " + style.customScrollbar}>
          <Container fluid>
            
            {/*image logo*/}
            <Navbar.Brand as={Link} to='/'>
                <img src={logo} style={{maxHeight: "50px"}}/>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h2>Menu</h2>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>


                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/" className={style.navLink}>Home</Nav.Link>
                  <Nav.Link as={Link} to="/contact" className={style.navLink}>Contact Us</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard" 
                    className={style.navLink}
                    style={{display: isAuthenticated ? "block" : "none"}}>
                      User Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/adoption" 
                    className={style.navLink}
                    style={{display: isAuthenticated ? "block" : "none"}}>
                      Adoption List
                  </Nav.Link>
                  
                </Nav>

                <div>
                  <Button variant="light" 
                      className={style.navLinkButtonLogin} 
                      as={Link} to='/register'
                      style={{display: isAuthenticated ? "none" : "block"}}
                  >
                    Register
                  </Button>

                  <Button variant="dark" 
                    className={style.navLinkButtonLogin} 
                    as={Link} to='/loginpage'
                    style={{display: isAuthenticated ? "none" : "block"}}
                  >
                    Login
                    </Button>


                  <Button variant="dark" 
                    className={style.navLinkButtonLogin} 
                    onClick={logOutHandler}
                    style={{display: isAuthenticated ? "block" : "none"}}
                    >
                      Logout
                    </Button>

                </div>
                

      
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}


    </header>
     

    </>


    );
}

export default WebHeader;
