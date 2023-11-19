import React, { useState, useEffect } from "react";
import "./navbar.css";
import http from "../../../http";

import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useContext } from "react";
import { TokenContext } from "../../LogIn/Login";
import axios from "axios";
import Cookies from 'universal-cookie'; // Import Cookies from 'universal-cookie'

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("navBar");

  const [tokenUse, setTokenUse] = useState("");
 
  // Function to toggle navbar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const { token, setToken } = useContext(TokenContext);
  console.log("token", token);
  

  // Create an instance of the universal-cookie
  const cookies = new Cookies();
// Get the cookie
 

  // cookies.set("cookiesToken", token,{ path: '/' });

  // setTokenUse(cookies.get("cookiesToken"));
  // console.log("tokenUse", tokenUse);

  useEffect(() => {
    const cookiesToken = cookies.get("cookiesToken");
    if (cookiesToken) {
      setTokenUse(cookiesToken);
    }
  }, []); 


  const logout = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${tokenUse}`,
      "Content-type": "application/json",
    };

    axios
      .post("http://localhost:8000/api/unauth/user/logout", null, { headers })
      .then((res) => {
        console.log(res.status)
        if(res.status == 200){
      cookies.remove("cookiesToken", { path: '/' , domain: "http://localhost:3000"});
      setToken(null); 
      setTokenUse(null);
          console.log("logout");
          
        }

       


        navigate('/');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };


  const removeNav = () => {
    setActive("navBar");
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>
              <MdTravelExplore className="icon" />
              Ghumna Jam.
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#" className="navLink">
                Home
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Packages
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Shop
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                About
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                News
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Contact
              </a>
            </li>

            {tokenUse  ? (
              <button className="WebBtn">
                <a href="/logout" onClick={logout}>
                  Log Out
                </a>
              </button>
            ) : (
              <>
                <button className="WebBtn">
                  <a href="/login">Sign In</a>
                </button>
                <button className="WebBtn">
                  <a href="/register">Register</a>
                </button>
              </>
            )}
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
