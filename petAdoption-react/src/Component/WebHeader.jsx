import React , {useEffect , useState , useRef} from 'react';
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
  const [menuDisplay , setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  const navRef = useRef(null);  // Ref for the Nav component

  const handleNavClick = (e) => {
    // Check if the clicked element is a Nav.Link
    const navLink = e.target.closest(`.${style.navLink}`);
    if (navLink) {
      console.log("hello");
      menuHide();
    }
  };

  useEffect(() => {
    const navElement = navRef.current;
    
    if (navElement) {
      // Add event listener to the entire Nav container
      navElement.addEventListener('click', handleNavClick);
    }

    // Cleanup function
    return () => {
      if (navElement) {
        navElement.removeEventListener('click', handleNavClick);
      }
    };
  }, []); 


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


  function menuShow(){setMenuDisplay(true)}

  function menuHide(){setMenuDisplay(false)}




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

            {/* Menu Toggle Button */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={menuShow}/>
            
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={menuDisplay}
              onHide={menuHide}
             
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h2>Menu</h2>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>


                <Nav className="justify-content-start flex-grow-1 pe-3" ref={navRef}>
                  <Nav.Link as={Link} to="/" className={style.navLink} onClick={menuHide}>Home</Nav.Link>
                  <Nav.Link as={Link} to="/contact" className={style.navLink} onClick={menuHide}>Contact Us</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard" 
                    className={style.navLink}
                    style={{display: isAuthenticated ? "block" : "none"}}
                    onClick={menuHide}
                    >
                      User Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/adoption" 
                    className={style.navLink}
                    style={{display: isAuthenticated ? "block" : "none"}}
                    onClick={menuHide}
                    >
                      Adoption List
                  </Nav.Link>
                  
                </Nav>

                <div>
                  <Button variant="light" 
                      className={style.navLinkButtonLogin} 
                      as={Link} to='/register'
                      style={{display: isAuthenticated ? "none" : "block"}}
                      onClick={menuHide}
                  >
                    Register
                  </Button>

                  <Button variant="dark" 
                    className={style.navLinkButtonLogin} 
                    as={Link} to='/loginpage'
                    style={{display: isAuthenticated ? "none" : "block"}}
                    onClick={menuHide}
                  >
                    Login
                    </Button>


                  <Button variant="dark" 
                    className={style.navLinkButtonLogin} 
                    onClick={()=>{
                      menuHide();
                      logOutHandler();
                    }}
                    
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
