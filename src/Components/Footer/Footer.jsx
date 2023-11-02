import React,{useEffect} from "react";
import './footer.css'
import './footer.scss'
import {FiSend} from "react-icons/fi";
import {MdOutlineTravelExplore} from "react-icons/md";

import Aos from 'aos'
import 'aos/dist/aos.css'
import {FaTwitter} from "react-icons/fa";
import {BsYoutube} from "react-icons/bs";
import {BsInstagram} from "react-icons/bs";
import {FaTripadvisor} from "react-icons/fa";
import {FiChevronRight} from "react-icons/fi";



const Footer =() => {

    useEffect(()=>{
        Aos.init({duration:2000})
      },[])
    
    return (
        
        <section className="footer">
            <div className="videoDiv">
                <video src="https://cdn.pixabay.com/vimeo/343454486/summer-24541.mp4?width=640&hash=2c93d7743016c3cf445b64df2ee212c54f0f125c" loop autoPlay muted type="video/mp4"></video>
            </div>


<div className="setContent container">
    <div className="contactDiv flex">
        <div   data-aos="fade-up" className="text">
            <small>KEEP IN TOUCH</small>
<h2>Travel with us</h2>
        </div>

<div className="inputDiv flex">
    <input   data-aos="fade-up" type="text" placeholder="Enter Email" />
    <button   data-aos="fade-up" className="btn flex" type="submit">
        SEND <FiSend className="icon"/>
    </button>
</div>

    </div>

<div className="footerCard flex">
    <div className="footerIntro flex">
        <div  data-aos="fade-up" className="logoDiv">
            <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" />Ghumna Jau.
            </a>
        </div>
        <div   data-aos="fade-up" className="footerParagraph">
            Let's enjoy every moment that you breathe!
        </div>

        <div   data-aos="fade-up" className="footerSocials flex">
            <FaTwitter className="icon" />
            <BsYoutube className="icon" />
            <BsInstagram className="icon" />
            <FaTripadvisor className="icon" />
 
        </div>
    </div>

    <div className="footerLinks grid">
        <div   data-aos="fade-up" className="linkGroup">
            <span className="groupTitle">
                OUR AGENCY

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Services
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Insurance
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Agency
                </li>
                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Tourism
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Payment
                </li>



            </span>
        </div>


        <div   data-aos="fade-up" className="linkGroup">
            <span className="groupTitle">
               PARTNERS

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Bookings
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Rentcars
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    Trivago
                </li>
                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    TripAdvisor
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    HotelGlobal
                </li>



            </span>
        </div>




        <div   data-aos="fade-up" className="linkGroup">
            <span className="groupTitle">
              Last Minute

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                   Paris
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                 Greece
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                   London
                </li>
                <li className="footerList flex">
                    <FiChevronRight className="icon" />
               Bali
                </li>

                <li className="footerList flex">
                    <FiChevronRight className="icon" />
                  Thailand
                </li>



            </span>
        </div>



    </div>

    <div className="footerDiv flex">
        <small>BEST TRAVEL WEBSITE</small>
        <small>COPYRIGHTS RESERVED</small>
    </div>
</div>

</div>

        </section>

    )
}

export default Footer