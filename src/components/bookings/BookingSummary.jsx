import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirmation }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    if (!isFormValid) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirmation(); // Ensure this is called as a function
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  if (!checkInDate.isValid() || !checkOutDate.isValid()) {
    return <Alert variant="danger">Invalid check-in or check-out date.</Alert>;
  }

  return (
    <div className="card card-body mt-5">
      <p>
        Full Name: <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date: <strong>{checkInDate.format("MM DD YYYY")}</strong>
      </p>
      <p>
        Check-Out Date: <strong>{checkOutDate.format("MM DD YYYY")}</strong>
      </p>
      <p>
        Number of Days: <strong>{numOfDays}</strong>
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
            Total Payment: <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button
              variant="success"
              onClick={handleConfirmBooking}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Processing Payment...
                </>
              ) : (
                "Confirm Booking and Proceed to Payment"
              )}
            </Button>
          ) : (
            isBookingConfirmed && (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )
          )}
        </>
      ) : (
        <p className="text-danger">
          Check-out date must be after check-in date.
        </p>
      )}
    </div>
  );
};

BookingSummary.propTypes = {
  booking: PropTypes.shape({
    guestName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numberOfAdults: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    numberOfChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  payment: PropTypes.number.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  onConfirmation: PropTypes.func.isRequired,
};

export default BookingSummary;
