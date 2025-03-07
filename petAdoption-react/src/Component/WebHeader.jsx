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





const WebHeader = () => {
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

                </Nav>


                
                <Button variant="dark" className={style.navLinkButtonLogin}>Login</Button>
      
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
