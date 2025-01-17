import React, { useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    // Add any additional logic for the toggle switch here
  };

  return (
    <div className="navbar">
      <h1 className="navbarHeader" onClick={() => navigate('/')}>
        HackMeIfYouCan
      </h1>
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