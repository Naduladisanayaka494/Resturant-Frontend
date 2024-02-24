import React, { useState } from "react";

const RoomFilter = ({data,setFiltedData}) => {
    const [filter, setFilter] = useState("");
    
    const handleSelectedChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filtereddRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase))
        setFiltedData(filtereddRooms);
    }
    
    const clearFilter = () => {
        setFilter("");
        setFilterdData(data)
    }

    const roomTypes =["",...new Set(data.map((room)=>room.roomType))]




    return
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">Filter Rooms By Type</span>
  </div>;
};

export default RoomFilter;
