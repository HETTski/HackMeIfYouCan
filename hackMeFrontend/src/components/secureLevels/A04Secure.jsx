import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A04Secure() {
  const [username, setUsername] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const authenticate = () => {
    axios
      .post(`http://localhost:8000/api/authenticate/`, { username: authUsername, password })
      .then((response) => {
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setError("");
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred during authentication");
      });
  };

  const changeRole = () => {
    if (isAuthenticated) {
      axios
        .post(`http://localhost:8000/api/secure-change-user-role/`, { username, new_role: newRole })
        .then((response) => {
          setMessage(response.data.message); // Message from the server
        })
        .catch((error) => {
          console.error(error);
          setMessage("An error occurred");
        });
    } else {
      setError("You must be authenticated to change the role");
    }
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Insecure Design (Secured)</h1>
      <p className="description">
        W tej części możesz zmienić rolę użytkownika. Zaloguj się, aby uzyskać dostęp do zmiany roli użytkownika.
      </p>
      {!isAuthenticated ? (
        <div>
          <input
            className="input"
            type="text"
            placeholder="Enter username"
            value={authUsername}
            onChange={(e) => setAuthUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={authenticate}>Login</button>
          {error && <p className="message">{error}</p>}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}

export default A04Secure;