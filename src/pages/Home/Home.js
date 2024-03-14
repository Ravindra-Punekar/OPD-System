import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuth, deleteUser } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import NvBar from "../../components/Navbar/Navbar";
import load from "../../assets/g1.gif";
import { useState } from "react";
import { useEffect } from "react";

import "./Home.css";

const auth = getAuth();

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <NvBar />
            <div className="welcome-slogan">
      <h1>Your Health is in Good Hands</h1>
      <span>Streamlined care for your OPD needs.</span>
    </div>
            <div className="gif-container">
                <img src={load} alt="Hospital GIF" className="centered-gif" />
            </div>
        </div>
    );
};



export default Home;
