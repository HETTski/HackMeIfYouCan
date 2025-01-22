import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ isToggled, handleToggle }) {
  const navigate = useNavigate();

  return (
    <div className={isToggled ? "secureNavbar" : "navbar"}>
      <div className='headerContainer'>
        <h1 className={`navbarHeader ${isToggled ? "HackMe" : ""}`} onClick={() => navigate('/')}>
          HackMe
        </h1>
        <h1 className={`navbarHeader ${isToggled ? "IfYouCan" : ""}`} onClick={() => navigate('/')}>
          IfYouCan
        </h1>
      </div>
      <div className="toggleSwitch">
        <input
          type="checkbox"
          id="toggle"
          checked={isToggled}
          onChange={handleToggle}
        />
        <label htmlFor="toggle" className="toggleLabel">
          <span className="toggleButton"></span>
        </label>
      </div>
    </div>
  );
}

export default Navbar;