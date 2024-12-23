import React, { useState } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards/Cards";
import Footer from "./Footer/Footer";
import bgimg from "../assets/bgimg.png";

const Home = () => {
  return (
    <div className="w-screen h-screen  text-white overflow-x-hidden">
      <div className="w-screen h-80 bg-[#262344] relative">
        <div className="z-10 absolute right-0 bottom-0">
          <img src={bgimg} alt="bgimg" className="w-54 h-54" />
        </div>
        <div className=" p-5 h-80 flex flex-col justify-center md:itmes-end md:justify-start">
          <h1 className="md:text-[5rem] text-[4rem] font-serif ">Work Hub</h1>
          <p className="text-[1rem] px-3 md:text-[1vw]">
            Get all the information you need to take your work to the next
            level.
          </p>
        </div>
      </div>
      <div className="w-screen min-h-full  flex  md:justify-between">
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
