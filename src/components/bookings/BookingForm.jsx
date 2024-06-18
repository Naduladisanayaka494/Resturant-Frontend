import React, { useState} from 'react'
import moment from "moment"
const BookingForm = () => {
    const [validated, setIsValidated] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmailame: "",
        checkIndate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren:""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    }
    const [roomInfo, setRoomInfo] = useStae({
        photo: "",
        roomType: "",
        roomPrice:""
    })
  const { roomId } = useParams()
  const navigate = UseNavigate()

  const getRoomPriceById = async (roomId) => {
    try {
        const response= await getRoomPriceById(roomId)
        setRoomPrice(response.roomPrice)
      } catch (error) {
        throw new Error(error)
      }
  }
  
  useEffect(() => {
    getRoomPriceById(roomId)
  }, [roomId])
  

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkIndate)
    const checkOutDate = moment(booking.checkOutDate)
    const diffIndays = checkOutDate.diff(checkInDate)
    const price = roomPrice ? roomPrice : 0
    return diffIndays * price
  }

  const isGuesValid = () => {
    const adultCount = parseInt(booking.numberOfAdults)
    const childrenCount = parseInt(booking.numberOfChildren)
    const totalCount = adultCount + childrenCount
    return totalCount>=1 && adultCount >=1
  }
  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkIndate))) {
      setErrorMessage("check out date come before check in date")
      return false
    } else {
      setErrorMessage("")
      return true
    }
  }

  const handleOnsubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (
      form.checkValidity() === false ||
      !isGuesValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
     setIsSubmited(true);
    }
    setIsValidated(true)
  }

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId,booking)
      setIsSubmited(true);
      navigate("/",{message:confirmationCode})
    } catch (error) {
      setErrorMessage(error.message)
      navigate("/", { message: error.message });

    }
  }

  return (
    <div>BookingForm</div>
  )
}

export default BookingForm