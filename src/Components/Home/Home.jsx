import React,{useEffect} from "react";
import "./home.css";
import "./home.scss";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TbAppsFilled } from "react-icons/tb";

import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])

  
  return (
    <section className="home">
      <div className="overlay"> </div>
      <video
        src="https://cdn.pixabay.com/vimeo/340670744/sea-24216.mp4?width=640&hash=f5d8caac458392ac811be5aaf088a820fbcb1fdb  "
        className="src"
        muted
        autoPlay
        loop
        preload="auto"
        type="video/mp4"
      ></video>

      <div className="homeContent container">
        <div data-aos="fade-up" className="testDiv">
          <span  className="smallText">Our Packages</span>

          <h1  className="homeTitle">Search your Holiday</h1>
        </div>

        <div  data-aos="fade-down-right" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination</label>
            <div className="input flex">
              <input type="text" placeholder="Enter name here ..." />
              <GrLocation className="icon" />
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Search your date</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price"> Max price</label>   
              <h3 className="total">$5000</h3>
            </div>
            <div className="input flex">
              <input type="range" max="5000" min="1000" />
            </div>
          </div>

          <div className="searchOptions flex">
            <HiFilter className="icon" />
            <span>More Filters</span>
          </div>
        </div>

        <div className="homeFooterIcons flex">
          <div className="rightIcons">
            <FiFacebook className="icon" />
            <AiFillInstagram className="icon" />
            <FaTripadvisor className="icon" />
          </div>

          <div className="leftIcons">
          <AiOutlineUnorderedList className="icon" />
          <TbAppsFilled className="icon" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
