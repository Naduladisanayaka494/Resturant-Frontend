import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utill/ApiFunctions";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
    
        <div className="mb-3">
          <label htmlFor="roomType" className="form-label">
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
            className="form-select"
          >
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewRoomTypeInput && (
            <div className="input-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
                onChange={handleNewRoomTypeInputChange}
                value={newRoomType}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
   
    </>
  );
};

export default RoomTypeSelector;
