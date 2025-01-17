import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A02Secure() {
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [key, setKey] = useState("");
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

  const fetchEncryptedData = () => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:8000/api/encrypted-data/`)
        .then((response) => {
          setEncryptedData(response.data.encrypted_data); // Encrypted data from the server
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("You must be authenticated to access this data");
    }
  };

  const decryptData = () => {
    if (isAuthenticated) {
      // Clear decrypted data before making the request
      setDecryptedData("");

      // Decrypt the data using the provided key
      axios
        .post(`http://localhost:8000/api/decrypt-data/`, { key, encrypted_data: encryptedData })
        .then((response) => {
          setDecryptedData(response.data.decrypted_data); // Decrypted data from the server
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
      <h1 className="header">2021 - Cryptographic Failures (Secured)</h1>
      <p className="description">
        W tej części swoje dane powinien uzyskać tylko użytkownik z poprawnym kluczem deszyfrującym. Zaloguj się, aby uzyskać dostęp do zaszyfrowanych danych i je odszyfrować.
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
          <button className="button" onClick={fetchEncryptedData}>Fetch Encrypted Data</button>
          {encryptedData && (
            <div>
              <input
                className="input"
                type="text"
                placeholder="Enter decryption key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <button className="button" onClick={decryptData}>Decrypt Data</button>
              {decryptedData && <p className="message">{decryptedData}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default A02Secure;