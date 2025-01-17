import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A03Secure() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
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

  const search = () => {
    if (isAuthenticated) {
      axios
        .post(`http://localhost:8000/api/secure-search/`, { search_term: searchTerm })
        .then((response) => {
          console.log("Response data:", response.data);
          setResults(response.data.result); // Results from the server
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("You must be authenticated to perform this search");
    }
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Injection (Secured)</h1>
      <p className="description">
        W tej części możesz wyszukiwać użytkowników po nazwie. Zaloguj się, aby uzyskać dostęp do wyszukiwania.
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
          <input
            className="input"
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={search}>Szukaj</button>
          <div className="results">
            {results.map((result, index) => (
              <div key={index} className="result">
                <p>ID: {result.id}</p>
                <p>Username: {result.username}</p>
                <p>Email: {result.email}</p>
                <p>Is Staff: {result.is_staff ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default A03Secure;