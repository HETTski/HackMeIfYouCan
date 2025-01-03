import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A09() {
  const [username, setUsername] = useState("");
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");

  const logAction = () => {
    axios
      .post(`http://localhost:8000/api/log-sensitive-info/`, { username, action })
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
      <h1 className="header">2021 - Security Logging and Monitoring Failures</h1>
      <p className="description">
        W tej części możesz zalogować akcję użytkownika bez odpowiedniego monitorowania i sanitacji danych. Spróbuj zalogować akcję użytkownika, aby zobaczyć, jak brak odpowiedniego logowania i monitorowania może prowadzić do problemów.
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
        placeholder="Enter action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      />
      <button className="button" onClick={logAction}>Log Action</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default A09;
