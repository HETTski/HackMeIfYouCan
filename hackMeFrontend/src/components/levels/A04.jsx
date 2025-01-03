import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A04() {
  const [username, setUsername] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");

  const changeRole = () => {
    axios
      .post(`http://localhost:8000/api/change-user-role/`, { username, new_role: newRole })
      .then((response) => {
        setMessage(response.data.message); // Message from the server
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred");
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Insecure Design</h1>
      <p className="description">
        W tej części możesz zmienić rolę użytkownika. Spróbuj wykorzystać lukę w zabezpieczeniach, aby zmienić rolę użytkownika na admina.
        <br />
        <strong>Przykład:</strong> Wprowadź nazwę użytkownika i nową rolę (np. admin), aby zmienić jego rolę.
      </p>
      <input
        className="input"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter new role"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      />
      <button className="button" onClick={changeRole}>Zmień rolę</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default A04;
