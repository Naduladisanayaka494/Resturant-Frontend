import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utill/ApiFunctions";
import RoomCard from "./RoomCard";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(""); // Add selectedRoomType state

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading rooms......</div>;
  }

  if (error) {
    return <div className="text-danger">Error......</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalpages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter
            data={data}
            setFilteredData={setFilteredData}
            setSelectedRoomType={setSelectedRoomType}
          />
        </Col>
        <Col md={6} className="d-flex align-items-center justify=content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalpages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      <Row>{renderRooms()}</Row>
    </Container>
  );
};

export default Room;
