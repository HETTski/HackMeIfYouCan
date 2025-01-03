import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A02() {
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [key, setKey] = useState("");

  const fetchData = () => {
    // Fetch encrypted data from the server
    axios
      .get(`http://localhost:8000/api/encrypted-data/`)
      .then((response) => {
        setEncryptedData(response.data.encrypted_data); // Encrypted data from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const decryptData = () => {
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
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Cryptographic Failures</h1>
      <p className="description">
        W tej części swoje dane powinien uzyskać tylko użytkownik z poprawnym kluczem deszyfrującym. Spróbuj uzyskać zaszyfrowane dane i je odszyfrować. (PS: Ktoś chyba zhardcodował klucz na backendzie, sprawdź to "weaksecretkey123")
      </p>
      <button className="button" onClick={fetchData}>Uzyskaj zaszyfrowane dane</button>
      <p className="A02Encrypted">{encryptedData}</p>
      <input
        className="input"
        type="text"
        placeholder="Enter decryption key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button className="button" onClick={decryptData}>Odszyfruj dane</button>
      {decryptedData && <p className="message">{decryptedData}</p>}
    </div>
  );
}

export default A02;
