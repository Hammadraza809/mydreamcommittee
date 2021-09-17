import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import HomeSlider from '../../../assets/images/homeSlider.png';
import Slider2 from '../../../assets/images/slider2.jpg';

class Slide extends Component{
    render(){
        return(
            <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 h-100"
                src={HomeSlider}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 h-100"
                src={Slider2}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        )
    }
}

export default Slide;