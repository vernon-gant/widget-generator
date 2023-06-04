import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Container>
        <Row>
          <Col xs={6}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Navbar.Brand
                style={{
                  fontSize: '26px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                }}
              >
                <b>Widget Generator</b>&nbsp;&nbsp;
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs={6} className="text-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
        </Row>
      </Container>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/impress">
              Impressum
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
