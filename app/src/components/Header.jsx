import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
        <Navbar sticky="top" bg="light" variant="light" className="navbar">
            <Navbar.Brand className="mr-auto logo-nav">Template 4</Navbar.Brand>
            <Nav className="mx-auto">
                <Nav.Link as={Link} to="/"> Home </Nav.Link>
                <Nav.Link as={Link} to="/file-management">File Management</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
  );
};

export default Header;