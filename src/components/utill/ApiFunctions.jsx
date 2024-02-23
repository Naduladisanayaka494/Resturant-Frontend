import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const api = axios.create({
    baseURL:"http://localhost:9192"
})

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/addnew-room", formData);
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
    
}

export async function getRoomTypes() {

    try {
        const response = await api.get("/rooms/room-types");
        return response.data
        
    } catch (error) {
        throw new Error("Error fetching room types");
        
    }
    
}
