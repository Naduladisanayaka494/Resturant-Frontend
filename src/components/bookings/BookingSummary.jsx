import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; // Make sure this is imported from the correct library

const BookingSummary = ({ booking, payment, isFormValid, onConfirmation }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfdays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirmation();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <p>
        FullName: <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In-Date:{" "}
        <strong>{moment(booking.checkInDate).format("MM DD YYYY")}</strong>
      </p>
      <p>
        Check-Out-Date:{" "}
        <strong>{moment(booking.checkOutDate).format("MM DD YYYY")}</strong>
      </p>
      <p>
        Number of Days: <strong>{numOfdays}</strong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numberOfAdults > 1 ? "s" : ""}: {booking.numberOfAdults}
        </strong>
        <br />
        <strong>Children: {booking.numberOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total Payment: <strong>{payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, redirecting to payment.....
                </>
              ) : (
                "Confirm Booking and proceed to payment"
              )}
            </Button>
          ) : (
            isBookingConfirmed && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <p className="text-danger">
          Check-out date must be after check-in date
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
