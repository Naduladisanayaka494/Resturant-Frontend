import React from 'react'
import { useLocation } from 'react-router-dom'

const bookingSuccess = () => {
    const location = useLocation()
    const messgae = location.state?.message
    const error = location.state?.error
  return (
      <div className='container'>
        <Header title="Booking Success/"></Header>
      </div>
  )
}ll

export default bookingSuccess