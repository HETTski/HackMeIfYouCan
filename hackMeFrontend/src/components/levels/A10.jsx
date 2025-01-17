import React, { useState } from "react";
import axios from "axios";
import './leaks.css';

function A10() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const fetchUrl = () => {
    axios
      .post(`http://localhost:8000/api/fetch-url/`, { url })
      .then((response) => {
        setContent(response.data.content); // Content from the fetched URL
      })
      .catch((error) => {
        console.error(error);
        setContent("An error occurred");
      });
  };

  return (
    <div className="leakContent">
      <h1 className="header">2021 - Server-Side Request Forgery (SSRF)</h1>
      <p className="description">
        W tej części możesz pobrać dane z dowolnego URL. Spróbuj wykorzystać lukę w zabezpieczeniach SSRF, aby uzyskać dostęp do wewnętrznych zasobów serwera.
        <br />
        <strong>Przykład:</strong> Wprowadź <code>https://jsonplaceholder.typicode.com/posts/1</code> jako URL, aby zobaczyć dane z tego adresu.
      </p>
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
  );
}

export default A10;
