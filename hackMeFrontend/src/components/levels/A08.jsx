import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A08() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post(`http://localhost:8000/api/upload-file/`, formData, {
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
  };

  return (
    <div className="leakContent">
      <h1 className="A08header">2021 - Software and Data Integrity Failures</h1>
      <p className="A08description">
        W tej części możesz przesłać plik bez sprawdzania jego integralności. Spróbuj przesłać plik, aby zobaczyć, jak brak sprawdzania integralności może prowadzić do problemów.
      </p>
      <input
        className="A08input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="A08Button" onClick={uploadFile}>Prześlij plik</button>
      {message && <p className="A08Message">{message}</p>}
    </div>
  );
}

export default A08;
