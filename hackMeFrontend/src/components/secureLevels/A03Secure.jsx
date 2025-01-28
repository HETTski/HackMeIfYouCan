import React, { useState } from "react";
import './leaks.css';

function A03Secure() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="leakContent">
      <h1 className="header">Jak zapobiegać atakom SQL Injection</h1>
      <p className="description">
        SQL injection to technika wstrzykiwania kodu, która może zniszczyć Twoją bazę danych. SQL injection jest jedną z najczęstszych technik hakowania stron internetowych. 
        Polega na umieszczaniu złośliwego kodu w instrukcjach SQL za pośrednictwem wejścia na stronie internetowej.
      </p>
      <h2 className="header">Najlepsze praktyki zapobiegania atakom SQL Injection</h2>
      <ul className="description">
        <li>Używaj przygotowanych instrukcji (zapytania z parametrami)</li>
        <li>Używaj procedur składowanych</li>
        <li>Waliduj dane wejściowe użytkownika</li>
        <li>Escapuj wszystkie dane dostarczone przez użytkownika</li>
        <li>Używaj ORM (Object Relational Mapping) Frameworks</li>
        <li>Ogranicz uprawnienia do bazy danych</li>
        <li>Regularnie aktualizuj i łataj swoje systemy</li>
        <li>Używaj zapór aplikacji webowych (WAF)</li>
      </ul>
      <div>
        <input
          className="input"
          type="text"
          placeholder="To pole nic nie robi"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default A03Secure;