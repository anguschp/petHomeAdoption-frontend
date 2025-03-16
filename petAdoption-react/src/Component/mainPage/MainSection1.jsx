import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from "../../styles/Container1.module.css";
import MainThumbNail from './MainThumbNail.jsx';

const Section_1_Container = ()=>{


        return (

            <Container fluid className={`${style.trimContainer} g-0 `}>
 
                <Row fluid className={`${style.trimRow} g-0`}>
                    <Col sm={8} className={style.trimCol}><MainThumbNail/></Col>
                    <Col fluid sm={4} className={style.trimCol}>donation list</Col>
                </Row>

            </Container>
                          

          );
    
}

export default Section_1_Container;