import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Photo1 from '../../assets/catSample/asdasdasd.jpg'
import Photo2 from "../../assets/catSample/dasdgbb.jpg"
import Photo3 from "../../assets/catSample/adasdasgw43.jpg"
import style from '../../styles/thumbnail.module.css'




const MainThumbNail = ()=>{


    


    return(

        <Carousel className={style.thumbnailContainer}>

            <Carousel.Item className={style.thumbnailInner}>
                <img src={Photo1} text="First slide" />
                <Carousel.Caption className={style.thumbNailCaption}>
                    <h3>Nelson</h3>
                    <Container>
                    <Row>
                        <Col sm={6}>Male</Col>
                        <Col sm={6}>Received date: 2025/4/5</Col>
                    </Row>
                    </Container>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className={style.thumbnailInner}>
                <img src={Photo2} text="First slide" /> 
                <Carousel.Caption className={style.thumbNailCaption}>
                <h3>Boris</h3>
                <Container>
                    <Row>
                        <Col sm={6}>Male</Col>
                        <Col sm={6}>Received date: 2025/4/5</Col>
                    </Row>
                    </Container>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className={style.thumbnailInner}>
            <img src={Photo3} text="First slide" />
                <Carousel.Caption className={style.thumbNailCaption}>
                <h3>Penny</h3>
                <Container>
                    <Row>
                        <Col sm={6}>Female</Col>
                        <Col sm={6}>Received date: 2025/1/9</Col>
                    </Row>
                    </Container>
                </Carousel.Caption>
            </Carousel.Item>

            
    </Carousel>

    )

}
 
export default MainThumbNail;