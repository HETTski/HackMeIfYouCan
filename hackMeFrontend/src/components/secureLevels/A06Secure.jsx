import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A06Secure() {
  const [data, setData] = useState(null);
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

  const fetchData = () => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:8000/api/fetch-data-from-secure-api/`)
        .then((response) => {
          setData(response.data.data); // Data from the secure API
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
      <h1 className="header">2021 - Vulnerable and Outdated Components (Secured)</h1>
      <p className="description">
        W tej części możesz uzyskać dostęp do danych z zewnętrznego API tylko po zalogowaniu. Zaloguj się, aby uzyskać dostęp do danych.
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
          <button className="button" onClick={fetchData}>Pobierz dane</button>
          {data && (
            <div className="data">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default A06Secure;