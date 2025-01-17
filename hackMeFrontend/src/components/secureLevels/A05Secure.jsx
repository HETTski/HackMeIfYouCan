import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A05Secure() {
  const [sensitiveInfo, setSensitiveInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const authenticate = () => {
    axios
      .post(`http://localhost:8000/api/authenticate/`, { username, password })
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

  const fetchSensitiveInfo = () => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:8000/api/get-sensitive-info/`)
        .then((response) => {
          setSensitiveInfo(response.data.sensitive_info); // Sensitive information from the server
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("You must be authenticated to access this data");
    }
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Security Misconfiguration (Secured)</h1>
      <p className="description">
        W tej części możesz uzyskać dostęp do wrażliwych informacji tylko po zalogowaniu. Zaloguj się, aby uzyskać dostęp do wrażliwych informacji.
      </p>
      {!isAuthenticated ? (
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
          <button className="button" onClick={fetchSensitiveInfo}>Pobierz wrażliwe informacje</button>
          {sensitiveInfo && (
            <div className="sensitiveInfo">
              <p><strong>DB Password:</strong> {sensitiveInfo.db_password}</p>
              <p><strong>API Key:</strong> {sensitiveInfo.api_key}</p>
              <p><strong>Admin Email:</strong> {sensitiveInfo.admin_email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default A05Secure;