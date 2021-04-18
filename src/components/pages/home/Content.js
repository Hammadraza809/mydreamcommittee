import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import "./Content.css";
import mobile from '../../../assets/images/mobile.png';
import bike from '../../../assets/images/bike.png';
import gold from '../../../assets/images/gold.png';
import house from '../../../assets/images/house.png';
import tractor from '../../../assets/images/tractor.png';
import RgstrBtn from '../../common/Button';


class Main extends Component {
    render() {
        return (
            <div className="text">
                <div className="heading">
                    <h1>Who We Are?</h1>
                </div>
                <div className="content">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                Looking for your dream car? or dream bike? or want to buy Gold but don't have enough money?
                                or want to buy your dream house..?<br />
                                <b>Don't worry now... beacuse My Dream Committee got you covered..</b><br />
                                We are a orginization which holds different committees at different times for car, bike, mobile,
                                Gold, tractor and many more.....
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Dream Committee is the privately-owned lucky draw providing company in Pakistan. Having hundreds of trusted customers,
                                the dream committee deals in providing easy and most effective solutions to make your dreams come true with its different types of committees in Pakistan.
                                <hr />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="heading">
                    <h1>Committees</h1>
                </div>
                <div className="committees">
                    <Container>
                        <Row className="first-row">
                            <Col className="committe">
                                <img src={mobile} />
                                <RgstrBtn />
                            </Col>
                            <Col className="committe">
                                <img src={bike} />
                                <RgstrBtn />
                            </Col>
                            <Col className="committe">
                                <img src={gold} />
                                <RgstrBtn />
                            </Col>
                            <Col className="committe">
                                <img src={house} />
                                <RgstrBtn />
                            </Col>
                            <Col className="committe">
                                <img src={tractor} />
                                <RgstrBtn />
                            </Col>
                            <Col className="committe-text">
                                <h4 className="coming-soon">...and many more...</h4>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Main;