import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import "./Header.css";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img style={{ width: "120px", height: "60px", margin: "0 0 0 40px" }} src={logo} alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                    <Nav className="mr">
                        <Nav.Link className="navItem" href="/">Home</Nav.Link>
                        <Nav.Link className="navItem" href="/about">About Us</Nav.Link>
                        <NavDropdown className="navItem" title="Committees" id="collasible-nav-dropdown">
                            <NavDropdown.Item className="navItem1" href="/carcommittee">Dream Car Committee (Registration Closed)</NavDropdown.Item>
                            <NavDropdown.Item className="navItem1" href="/carcommittee">Dream Car Committee 2 (Registrations Open)</NavDropdown.Item>
                            <NavDropdown.Item className="navItem1" href="/tractorcommittee">Dream Tractor Committee (Registrations Open)</NavDropdown.Item>
                            <NavDropdown.Item className="navItem1" href="/mobilecommittee" disabled>Dream Mobile Committee (Coming Soon)</NavDropdown.Item>
                            <NavDropdown.Item className="navItem1" href="/goldcommittee" disabled>Dream Gold Committee (Coming Soon)</NavDropdown.Item>
                            <NavDropdown.Item className="navItem1" href="/housecommittee" disabled>Dream House Committee (Coming Soon)</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="navItem" href="/contact">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;