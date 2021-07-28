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
                                Subscribe us on YouTube <br />
                                <a href="https://www.youtube.com/TV88OFFICIAL" target="_blank" rel="noopener noreferrer">
                                    <img style={{
                                        width:"40px", padding:"5px"
                                        }}
                                        alt="youtube link icon" 
                                        src={Youtube} />
                                        TV88 OFFICIAL
                                </a>
                                <br/><br/>
                                <a href="/terms">Terms and Conditions.</a>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={6} className="committeeList">
                                Committees<br />
                                <ul>
                                    <li><a href="/carcommittee">Dream Car Committee (Registration Closed)</a></li>
                                    <li><a href="/carcommittee">Dream Car Committee 2 (Registrations Open)</a></li>
                                    <li><a href="/tractorcommittee">Dream Tractor Committee (Registrations Open)</a></li>
                                    <li><a href="/">Dream Gold Committee (Coming Soon..)</a></li>
                                    <li><a href="/">Dream House Committee (Coming Soon..)</a></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="copyright">
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={4} lg={6}>
                                Copyright <CopyRight fontSize="small"/> HBH IT Solutions.
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