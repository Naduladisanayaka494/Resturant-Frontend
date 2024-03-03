// EditRoom.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../utill/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setRoom({ ...room, photo: selectedImage });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        if (roomData.photo) {
          setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
        } else {
          setErrorMessage("No photo available for this room.");
        }
      } catch (error) {
        setErrorMessage("Error fetching room data.");
        console.log(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
        setSuccessMessage("Room updated successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room.");
      }
    } catch (error) {
      setErrorMessage("Error updating room.");
      console.log(error);
    }
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-4 text-center">Edit Room</h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={room}
              />
            </div>
            <div className="form-group">
              <label htmlFor="roomPrice">Room Price</label>
              <input
                className="form-control"
                required
                id="roomPrice"
                name="roomPrice"
                type="number"
                value={room.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Room Photo</label>
              <input
                id="photo"
                name="photo"
                type="file"
                className="form-control-file"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview Room Photo"
                  className="img-fluid mt-3"
                />
              )}
            </div>
            <div className="d-grid mt-4">
              <Link to={"/exsisting-rooms"} className="btn btn-primary">
                Back
              </Link>
              <br></br>
              <button className="btn btn-primary" type="submit">
                Edit Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
