import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A01() {
  const [secretData, setSecretData] = useState("");
  const [username, setUsername] = useState("");

  const fetchData = () => {
    // Nie ma sprawdzania, czy użytkownik jest zalogowany
    axios
      .get(`http://localhost:8000/api/secret-data/?username=${username}`)
      .then((response) => {
        setSecretData(response.data.secret_data); // Dane zwrócone bez autoryzacji
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Broken Access Control</h1>
      <p className="description">
        W tej części swoje dane powinien uzyskać tylko zalogowany użytkownik. Spróbuj uzyskać sekretne dane bez logowania. (Podpowiedź spróbuj użyć loginu admin lub user1)
      </p>
      <input
        className="input"
        type="text"
        placeholder="Enter something"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="button" onClick={fetchData}>Submit</button>
      {secretData && <p className="message">{secretData}</p>}
    </div>
  );
}

export default A01;
