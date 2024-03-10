import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Parallax from "../common/Parallax";
import HotelService from "../common/HotelService";
import HeaderMain from "../layout/HeaderMain";
import RoomCarousel from "../room/RoomCarousel";



const Home = () => {
  return (
    <>
      <section>
        <HeaderMain />
      </section>
      <section className="container">
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
        <RoomCarousel />
      </section>
    </>
  );
};

export default Home;

