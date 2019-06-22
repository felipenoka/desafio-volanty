import React from "react";

import { Row, Container, Col } from "react-bootstrap";

import "./infocar.css";

const AboutCars = ({ info }) => {
  return (
    <Container className="car-infos fipe-table mt-3 mb-5">
      {info.map(item => (
        <div key={item.key}>
          <Row className="car-box-clearfix text-left">
            <Col lg={6} md={6} sm={12} className="car-model">
              <p className="heading">{item.marca}</p>
              <h3>{item.name}</h3>
              <p className="info">
                Código Fipe:
                <span>{item.fipe_codigo}</span>
              </p>
            </Col>
            <Col lg={6} md={6} sm={12} className="car-price">
              <p className="heading">Preço médio</p>
              <h3>{item.preco}</h3>
              <p className="info">
                Mês de referência:
                <span className="text-capitalize"> {item.referencia}</span>
              </p>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default AboutCars;
