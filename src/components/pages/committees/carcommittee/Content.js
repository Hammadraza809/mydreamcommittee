import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import "./Content.css";
import Slider1 from '../../../../assets/images/slider1.jpg';
import youtube from '../../../../assets/images/youtube.png';
import Button from '@material-ui/core/Button';

class Main extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="text">
                <img className="d-block w-100 h-100" src={Slider1} alt="slider" />
                <div className="headingg">
                    <h1>Dream Car Committee</h1>
                    <hr />
                </div>
                <div className="contentt">
                    <Container>
                        <Row className="staytunned">
                            <Col>
                                Stay Tuned with us <br />Dream Car Luckydraw will be held on <b>15th of April 2021</b> live on our youtube channel.<br />
                                <a style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                                    href="https://www.youtube.com/c/TV88OFFICIAL"
                                    target="_blank" rel="noreferrer noopener">
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
                        <Row>
                            <Col xs={12} md={12}>
                                <p>Great News for All Friends
                                A Dream Car Committee has been started for friends with a total duration of 20 Months.
                                Members will be given a car every month through a lottery.</p>

                                To be a member of this committee, the amount of PKR 615,000 needs to be submitted. <br />
                                Each member will get his own car every month. <br />
                                The total value of the car will be approx Rs 17 to 18 lakh <br />
                                The car will be delivered within one to two weeks of being named in the lottery <br />
                                The car will be on the company's open letter <br />
                                Tax and documentation cost will be on the member. <br />
                                In addition, car is free to use <br />
                                15,000 PKR will be taken in the form of booking, confirmation and registration and car registration form will be issued after receiving 600,000 PKR. <br />
                                All the accounts will be processed by 15 March. <br />
                                This system will be formally launched on 15 April. <br />
                                First car will be given to the winner of the lucky draw take place from 1st to 5th May. <br />
                                After that there will be a lucky draw from 1st to 5th of each month and the cars will be given according to the schedule. <br />
                                <br />
                                <b>Dream Car Committee</b>
                                <br />
                                Having a luxurious car is the dream for every person. These cars give a unique glorious feel and magnificent look. But, affording these cars is not that easy if you are an average earning individual.<br />
                                <br />
                                Don’t worry, the Dream Car Committee is here for you.  You don’t need to wait for years to have your dream car in your hands. The Dream Car Committee will make you the owner of one of these luxurious cars.<br />
                                <br />
                                <b>Registration Price</b><br />
                                If you want to be the owner of a fine luxury car then get yourself registered at Dream Committee.<br />
                                <br />
                                <b>Car Ranges</b><br />
                                The Dream Car Committee is offering cars that are ranging from PKR 15 Lakh to 17 Lakh.<br />
                                <br />
                                <b>Draw Schedule</b><br />
                                The draw for the dream car will be held once from 1st to 5th of every month and every person will get his own car each month through a lucky draw. The draw is held at Dream Car Committee Website.<br />
                                <br />
                            </Col>
                        </Row>
                        <div className="rgstr">
                            <Row className="btnRgstr">
                                <Button
                                onClick={() => {
                                    this.props.props.history.push("/register/DCC2")
                                }}
                                    // href="\register"
                                    style={{
                                        backgroundColor: "rgb(252, 143, 0)",
                                        color: "white",
                                        padding: "10px 15px",
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