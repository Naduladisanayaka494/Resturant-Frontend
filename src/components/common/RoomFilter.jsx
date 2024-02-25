// RoomFilter.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomFilter = ({ data, setFilteredData, setSelectedRoomType }) => {
  // Accept setSelectedRoomType prop
  const [filter, setFilter] = useState("");

  const handleSelectedChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    setSelectedRoomType(selectedRoomType); // Set selected room type
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    setSelectedRoomType(""); // Clear selected room type
    setFilteredData(data);
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter Rooms By Type
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectedChange}
      >
        <option value={""}>Select a room type to filter....</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
