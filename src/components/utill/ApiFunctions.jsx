import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const api = axios.create({
  baseURL: "http://localhost:9191",
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error adding room: " + error.message);
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types: " + error.message);
  }
}

export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching rooms: " + error.message);
  }
}

export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room: ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating room: ${error.message}`);
  }
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data
        
    } catch (error) {
       throw new Error(`Error  fetching room ${error.message}`)
        
  }
 
}

 export async function bookRoom(roomId, booking) {
    try {
      const response = await api.post(
        `/bookings/room/${roomId}/booking`,
        booking
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error (error.response.data)
      } else {
        throw new Error(`Error booking room : ${error.message}`)
      }
   }


   

 
}
  

   export async function getAllBookings() {
     try {
       const result = await api.get("/bookings/all-bookings");
       return result.data;
     } catch (error) {
       throw new Error(`Error fetechings booking:${error.message}`);
     }
}
   
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
    return result.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`Error find booking :${error.message}`)
    }
    
  }
}

export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
    return result.data
  } catch (error) {
    throw new Error(`Error cancelling booking:${error.message}`)
    
  }
}
