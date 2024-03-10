import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRoom from './components/room/AddRoom'
import "bootstrap/dist/css/bootstrap.min.css";
import ExsistingRooms from './components/room/ExsistingRooms';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/edit-room/:roomId" element={<EditRoom />}></Route>
            <Route path="/exsisting-rooms" element={<ExsistingRooms />}></Route>
            <Route path="/add-room" element={<AddRoom />}></Route>
            <Route path="/browse-all-rooms" element={<RoomListing />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  );
}

export default App
