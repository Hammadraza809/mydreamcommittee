import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import Youtube from '../../assets/images/youtube.png';
import CopyRight from '@material-ui/icons/Copyright';

class Footer extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="footer">
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={4} lg={6} className="follow">
                                Susbcribe Us on Youtube <br />
                                <a href="https://www.youtube.com/TV88OFFICIAL" target="_blank">
                                    <img style={{
                                        width:"40px", padding:"5px"
                                        }} 
                                        src={Youtube} />
                                        TV88 OFFICIAL
                                </a>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={6} className="committeeList">
                                Committees<br />
                                <ul>
                                    <li><a href="/carcommittee">Dream Car Committee</a></li>
                                    <li><a href="#">Dream Bike Committee (Comming Soon..)</a></li>
                                    <li><a href="#">Dream Gold Committee (Comming Soon..)</a></li>
                                    <li><a href="#">Dream House Committee (Comming Soon..)</a></li>
                                    <li><a href="#">Dream Tractor Committee (Comming Soon..)</a></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="copyright">
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={4} lg={6}>
                                Copyright <CopyRight fontSize="small"/> 2021.
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={6}>
                                All Rights Reserved. My Dream Committee.
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
export default Footer;