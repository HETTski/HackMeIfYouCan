import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A01Secure() {
  const [secretData, setSecretData] = useState("");
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
        .get(`http://localhost:8000/api/secret-data/?username=${username}`)
        .then((response) => {
          setSecretData(response.data.secret_data); // Dane zwrócone po autoryzacji
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
      <h1 className="header">2021 - Broken Access Control (Secured)</h1>
      <p className="description">
        W tej części swoje dane powinien uzyskać tylko zalogowany użytkownik. Zaloguj się, aby uzyskać dostęp do sekretów.
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
          <button className="button" onClick={fetchData}>Fetch Secret Data</button>
          {secretData && <p className="message">{secretData}</p>}
        </div>
      )}
    </div>
  );
}

export default A01Secure;