import { useEffect, useState } from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import style from '../../styles/thumbnail.module.css';
import { getPetList } from '../../api/apiAgent';

const MainThumbNail = () => {
    const [petData, setPetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    let params = { limit: 3 };

    const getThumbnailData = async () => {
        try {
            const response = await getPetList(params);
            setPetData(response.data);
            //setLoading(false); // We'll handle this after images load
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Function to preload images
    const preloadImages = (imageUrls) => {
        const promises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        return Promise.all(promises);
    };

    useEffect(() => {
        getThumbnailData();
    }, []);

    useEffect(() => {
        if (petData.length > 0) {
            // Extract all image URLs
            const imageUrls = petData.flatMap(pet => pet.imageURL);
            
            // Preload images
            preloadImages(imageUrls)
                .then(() => {
                    setImagesLoaded(true);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error loading images:", error);
                    setLoading(false);
                });
        }
    }, [petData]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!imagesLoaded) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <p>Loading images...</p>
            </div>
        );
    }

    return (
        <Carousel className={style.thumbnailContainer}>
            {petData.map((pet, index) => (
                <Carousel.Item className={style.thumbnailInner} key={index}>
                    <img 
                        src={pet.imageURL[0]} 
                        alt={pet.name} 
                        onLoad={(e) => {
                            // This ensures each image is fully loaded before display
                            e.target.style.opacity = 1;
                        }}
                        style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
                    />
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
            ))}
        </Carousel>
    );
};

export default MainThumbNail;