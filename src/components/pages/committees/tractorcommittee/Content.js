import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import "./Content.css";
import Slider1 from '../../../../assets/images/slider1.jpg';
import youtube from '../../../../assets/images/youtube.png';
import Button from '@material-ui/core/Button';
import TractorTitle from '../../../../assets/images/tractortitle.jpeg';
import TractorDetails from '../../../../assets/images/tractordetails.jpeg';
import TractorSlider from '../../../../assets/images/tractorslider.jpg';

class Main extends Component {
    render() {
        return (
            <div className="text">
                <img className="d-block w-100 h-100" src={TractorSlider} alt="slider" />
                <div className="headingg">
                    <h1>Dream Tractor Committee</h1>
                    <hr />
                </div>
                <div className="contentt">
                    <Container>
                        <Row className="staytunned">
                            <Col>
                                <b>Dream Tractor committee will be starting soon.. ! Register yourself to win a Tractor.</b>
                                <a style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                                    href="https://www.youtube.com/c/TV88OFFICIAL"
                                    target="_blank" rel="noreferrer noopener">
                                    <br />
                                    <img style={{
                                        width: "60px",
                                        height: "40px",
                                        margin: "10px"
                                    }}
                                        alt="youtube"
                                        src={youtube}
                                    />
                                    Subscribe to our youtube channel TV88 OFFICIAL
                                </a>
                                <br /><br />
                            </Col>
                        </Row>
                        <div>
                            <Row>
                                <Col xs={12} md={12}>
                                    <img
                                        style={{
                                            width: "550px",
                                            height: "650px",
                                            display: 'inline',
                                            margin: '2px',
                                        }}
                                        alt="tractor"
                                        src={TractorDetails}
                                    />
                                    <img
                                        style={{
                                            width: "550px",
                                            height: "650px",
                                            display: 'inline',
                                            margin: '2px',
                                        }}
                                        alt="tractor"
                                        src={TractorTitle}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <div className="termslink">
                            <h4>Read <a className="termslink" href="\terms">Terms and conditions here</a></h4>
                        </div>
                        <br/>
                        <div className="rgstr">
                            <Row className="btnRgstr">
                                <Button
                                    href="\register"
                                    style={{
                                        backgroundColor: "rgb(252, 143, 0)",
                                        color: "white",
                                        padding: "15px 20px",
                                        width: "100%"
                                    }}
                                    variant="contained"
                                >Register Now</Button>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Main;