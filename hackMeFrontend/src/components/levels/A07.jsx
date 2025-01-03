import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A07() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = () => {
    axios
      .post(`http://localhost:8000/api/insecure-login/`, { username, password })
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
      <h1 className="header">2021 - Identification and Authentication Failures</h1>
      <p className="description">
        W tej części możesz zalogować się bez poprawnej walidacji hasła. Spróbuj zalogować się jako dowolny użytkownik bez podawania hasła.
        <br />
        <strong>Przykład:</strong> Wprowadź nazwę użytkownika i dowolne hasło, aby zalogować się.
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
      <button className="button" onClick={login}>Zaloguj się</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default A07;
