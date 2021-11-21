import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Row className="fixed-bottom" style={{ backgroundColor: "black" }}>
        <Col className="text-center py1 text-white">
          Copyright &copy; Anı Kutusu
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
