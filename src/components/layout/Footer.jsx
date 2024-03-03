import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  let today = new Date();

  return (
    <footer className="bg-light py-3 mt-lg-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center text-dark">
            {" "}
            {/* Changed text color to dark */}
            <p className="mb-0">&copy; {today.getFullYear()} Nadula Hotel</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
