import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import slideImg from './images/slide.jpg';
import classes from './Slider.module.scss'

function UncontrolledExample() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className={classes.wrap}
                    src={slideImg}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={classes.wrap}
                    src={slideImg}
                    alt="Second slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={classes.wrap}
                    src={slideImg}
                    alt="Third slide"
                />

            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;