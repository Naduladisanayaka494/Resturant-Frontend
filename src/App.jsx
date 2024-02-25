import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRoom from './components/room/AddRoom'
import "bootstrap/dist/css/bootstrap.min.css";
import ExsistingRooms from './components/room/ExsistingRooms'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddRoom></AddRoom>
      <ExsistingRooms></ExsistingRooms>
    </>
  )
}

export default App
