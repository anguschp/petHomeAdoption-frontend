import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/petDetails.css'


const PhotoSlide = ({ImageList}) => {
  
  
  
    return (
    <>
    
    <Carousel>
            
            {
                ImageList.map((image , index)=>{
                    return(
                        <Carousel.Item key={index}>
                        <img src={image} alt="Pet Images" className='slideImage'/>
                    </Carousel.Item>
                    )
                })
            }
 
        </Carousel>
    
    </>
    )

}

export default PhotoSlide