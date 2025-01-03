import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A06() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/fetch-data-from-vulnerable-api/`)
      .then((response) => {
        setData(response.data.data); // Data from the vulnerable API
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Vulnerable and Outdated Components</h1>
      <p className="description">
        W tej części możesz uzyskać dostęp do danych z zewnętrznego API, które jest podatne na ataki z powodu używania przestarzałych komponentów. Kliknij przycisk, aby pobrać dane.
      </p>
      <button className="button" onClick={fetchData}>Pobierz dane</button>
      {data && (
        <div className="data">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default A06;