import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <Navbar
            className="colorNav"
            variant="light"
            expand="lg"
            style={{
                padding: '20px',
                backgroundColor: '#9b4db7',
                color: 'white',
                top: '0',
                width: '100%',
                fontSize: '20px',
            }}
        >
            <Navbar.Brand
                style={{
                    fontSize: '26px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    marginLeft: '20px',
                }}
            >
                <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                    <b>Widget Generator</b>
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/about" className="ml-auto">
                        About
                    </Nav.Link>
                    <Nav.Link as={Link} to="/impress" className="ml-auto">
                        Impressum
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
