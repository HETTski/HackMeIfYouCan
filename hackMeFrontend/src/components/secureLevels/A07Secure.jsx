import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A07Secure() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = () => {
    axios
      .post(`http://localhost:8000/api/secure-login/`, { username, password })
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
      <h1 className="header">2021 - Identification and Authentication Failures (Secured)</h1>
      <p className="description">
        W tej części możesz zalogować się tylko z poprawną walidacją hasła. Wprowadź nazwę użytkownika i hasło, aby się zalogować.
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
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={login}>Login</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default A07Secure;