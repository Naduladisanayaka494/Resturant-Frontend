import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrin-0 mr-3 mb-3 mb-md-0">
            <Link
              to={`/book-room/${room.id}`}
              className="btn btn-hotel btn-sm btn-primary"
            >
              <Card.Img
                variant="top"
                src={"data:image/png;base64," + room.photo}
                alt="Room Photo"
                style={{ width: "100%", maxWidth: 200, height: "auto" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">{room.roomPrice}</Card.Title>
            <Card.Text>
              Some Room information goes here for the guest to read through
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link
              to={`/book-room/${room.id}`}
              className="btn btn-hotel btn-sm btn-primary"
            >
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
