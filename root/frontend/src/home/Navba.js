import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


export const Navigation = () => {
    return (
        <Navbar classname="colorNav" variant="light" expand="lg" style={
            {   padding: "20px",
                backgroundColor: "#9b4db7",
                color: 'white',
                top: '0',
                width: '100%',
                fontSize: '20px',
            }
            }>

            <Navbar.Brand href="#home" style={{
                    fontSize: '26px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, Helvetica, sans-serif'

                }}>
                <b> Widget Generator</b>&nbsp;&nbsp;
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#imprint" >Impressum</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
}
export default Navigation;
