import { useEffect, useState } from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';

import style from '../../styles/thumbnail.module.css'
import {getPetList} from '../../api/apiAgent';


const MainThumbNail = ()=>{
    

    const [petData , setPetData] = useState([]);
    //const [loading , setLoading] = useState(true);
    let params = {limit: 3};


    const getThumbnailData = async ()=>{
    
        try{
            const response = await getPetList(params);
            setPetData(response.data);
            console.log("Pet data: " + JSON.stringify(petData));
            //setLoading(false);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getThumbnailData();
    },[])


    return(
        <>
        <Carousel className={style.thumbnailContainer}>
            
            
            {
                petData.map((pet , index)=>{
                    return(
                        <Carousel.Item className={style.thumbnailInner} key={index}>
                        <img src={pet.imageURL[0]} alt={pet.name} />
                        <Carousel.Caption className={style.thumbNailCaption}>
                            <h3>{pet.name}</h3>
                            <Container>
                            <Row>
                                <Col sm={6}>Capture Date: {pet.received_date}</Col>
                                <Col sm={6}>{pet.gender}</Col>
                            </Row>
                            </Container>
                        </Carousel.Caption>
                    </Carousel.Item>
                    )
                })
            }
 
        </Carousel>
        </>
    )

}
 
export default MainThumbNail;


