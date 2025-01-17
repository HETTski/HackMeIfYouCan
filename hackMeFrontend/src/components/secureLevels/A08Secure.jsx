import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A08Secure() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
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

  const uploadFile = () => {
    if (isAuthenticated) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post(`http://localhost:8000/api/secure-upload-file/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          setMessage(response.data.message); // Message from the server
        })
        .catch((error) => {
          console.error(error);
          setMessage("An error occurred");
        });
    } else {
      setError("You must be authenticated to upload files");
    }
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Software and Data Integrity Failures (Secured)</h1>
      <p className="description">
        W tej części możesz przesyłać pliki tylko po zalogowaniu. Zaloguj się, aby uzyskać dostęp do przesyłania plików.
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
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="button" onClick={uploadFile}>Upload File</button>
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default A08Secure;