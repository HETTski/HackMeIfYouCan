import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A10Secure() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
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

  const fetchUrl = () => {
    if (isAuthenticated) {
      axios
        .post(`http://localhost:8000/api/secure-fetch-url/`, { url })
        .then((response) => {
          setContent(response.data.content); // Content from the fetched URL
        })
        .catch((error) => {
          console.error(error);
          setContent("An error occurred");
        });
    } else {
      setError("You must be authenticated to fetch data from a URL");
    }
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Server-Side Request Forgery (SSRF) (Secured)</h1>
      <p className="description">
        W tej części możesz pobrać dane z dowolnego URL tylko po zalogowaniu. Zaloguj się, aby uzyskać dostęp do pobierania danych z URL.
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
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button" onClick={fetchUrl}>Fetch URL</button>
          {content && (
            <div className="content">
              <pre>{content}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default A10Secure;