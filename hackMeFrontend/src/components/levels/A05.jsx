import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A05() {
  const [sensitiveInfo, setSensitiveInfo] = useState(null);

  const fetchSensitiveInfo = () => {
    axios
      .get(`http://localhost:8000/api/get-sensitive-info/`)
      .then((response) => {
        setSensitiveInfo(response.data.sensitive_info); // Sensitive information from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Security Misconfiguration</h1>
      <p className="description">
        W tej części możesz uzyskać dostęp do wrażliwych informacji z powodu błędnej konfiguracji zabezpieczeń. Kliknij przycisk, aby zobaczyć wrażliwe informacje.
      </p>
      <button className="button" onClick={fetchSensitiveInfo}>Pobierz wrażliwe informacje</button>
      {sensitiveInfo && (
        <div className="sensitiveInfo">
          <p><strong>DB Password:</strong> {sensitiveInfo.db_password}</p>
          <p><strong>API Key:</strong> {sensitiveInfo.api_key}</p>
          <p><strong>Admin Email:</strong> {sensitiveInfo.admin_email}</p>
        </div>
      )}
    </div>
  );
}

export default A05;
