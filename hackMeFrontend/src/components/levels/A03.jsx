import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A03() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const search = () => {
    axios
      .post(`http://localhost:8000/api/vulnerable-search/`, { search_term: searchTerm })
      .then((response) => {
        setResults(response.data.result); // Results from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Injection</h1>
      <p className="description">
        W tej części możesz wyszukiwać użytkowników po nazwie. Spróbuj wykorzystać lukę w zabezpieczeniach SQL Injection, aby uzyskać więcej danych.
        <br />
        <strong>Przykład:</strong> Wprowadź <code>' OR '1'='1</code> jako termin wyszukiwania, aby zobaczyć wszystkie dane użytkowników.
      </p>
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
            <p>Is Admin: {result.is_admin ? "Yes" : "No"}</p>
            <p>Secret Data: {result.secret_data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default A03;
