import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import "./Content.css";


class Main extends Component {
    render() {
        return (
            <div className="text">
                <div className="headingg">
                    <h1>Contact Us</h1>
                </div>
                <div className="contentt">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                You can send us email @<br/><hr/>
                                mydreamcommittee@gmail.com
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Main;