import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaClock,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import Header from "./Header";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Services"} />
        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color">lakeSide Hotel</span>
          </h4>
          <span className="gap-2">
            <FaClock />
            -24-Hour Front Desk
          </span>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi />
                  WiFi
                </Card.Title>
                <Card.Text>
                  Stay connected with high-speed internet access.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils />
                  Breakfast
                </Card.Title>
                <Card.Text>
                  Enjoy complimentary breakfast every morning.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking />
                  Parking Space
                </Card.Title>
                <Card.Text>Ample parking space available for guests.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake />
                  Air Conditioning
                </Card.Title>
                <Card.Text>
                  Stay cool with centralized air conditioning.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt />
                  Laundry
                </Card.Title>
                <Card.Text>Laundry service available upon request.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
