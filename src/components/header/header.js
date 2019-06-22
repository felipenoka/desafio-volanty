import React from "react";

import "./header.css";
import { Navbar, Container } from "react-bootstrap";

const Header = () => (
  <Navbar variant="light" className="borderbottom">
    <Container className="d-flex justify-content-center align-items-center">
      <Navbar.Brand>Tabela FIPE</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
