import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import "./Content.css";
import Slider2 from '../../../assets/images/slider2.jpg';

class Main extends Component {
    render() {
        return (
            <div className="text">
                <Row className="img">
                    <img className="d-block w-100" src={Slider2} alt="slider" />
                </Row>
                <div className="headingg">
                    <h1>My Dream Committee</h1>
                </div>
                <div className="contentt">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                Dream Committee is the privately-owned lucky draw providing company in Pakistan. Having hundreds of trusted customers, the dream committee deals in providing easy and most effective solutions to make your dreams come true with its different types of committees in Pakistan.
                                Our relationship with customers is purely loyal and we deal with them as a partner in these committees.
                                <br />
                                With just a basic amount you can now afford or can have your dream car, bike, home, gold, tractor, and mobile phone.
                                <br />
                                You don’t need to worry about affording a luxurious lifestyle, because my dream committee makes it true for you.
                                <br />
                                <hr />
                                <span className="types"><b>Type of Committees:</b><br /></span>
                                Dream Committee provides different types of committees to its loyal customers. Some of them are listed below:
                                <br />
                                <ul>
                                    <li>Dream Car Committee</li>
                                    <li>Dream Bike Committee</li>
                                    <li>Dream House Committee</li>
                                    <li>Dream Mobile Committee</li>
                                    <li>Dream Tractor Committee</li>
                                    <li>Dream Gold Committee</li>
                                </ul>
                                <hr />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Main;