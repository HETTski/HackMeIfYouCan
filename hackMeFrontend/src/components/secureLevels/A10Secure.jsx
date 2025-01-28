import React from "react";
import './leaks.css';

function A10Secure() {
  return (
    <div className="leakContent">
      <h1 className="header">Server-Side Request Forgery (SSRF)</h1>
      <p className="description">
        Server-Side Request Forgery (SSRF) to rodzaj ataku, w którym atakujący zmusza serwer do wykonania żądania HTTP do niezamierzonego miejsca docelowego. Może to prowadzić do ujawnienia wewnętrznych zasobów, takich jak serwery baz danych, usługi wewnętrzne, a nawet dane uwierzytelniające.
      </p>
      <h2 className="header">Jak działa SSRF?</h2>
      <p className="description">
        Atak SSRF polega na wykorzystaniu funkcji serwera, która wykonuje żądania HTTP, takich jak pobieranie danych z zewnętrznych API. Atakujący manipuluje adresem URL, aby serwer wykonał żądanie do wewnętrznego zasobu, który normalnie nie byłby dostępny z zewnątrz.
      </p>
      <h2 className="header">Przykład ataku SSRF</h2>
      <p className="description">
        Przykład: Aplikacja webowa pozwala użytkownikom na podanie URL, z którego serwer pobiera dane. Atakujący podaje URL wskazujący na wewnętrzny serwer, np. <code>http://localhost:8080/admin</code>, co pozwala na dostęp do zasobów administracyjnych.
      </p>
      <h2 className="header">Jak zapobiegać atakom SSRF?</h2>
      <ul className="description">
        <li>Waliduj i filtruj dane wejściowe użytkownika, aby upewnić się, że zawierają tylko dozwolone adresy URL.</li>
        <li>Używaj listy dozwolonych adresów (whitelist) zamiast listy zablokowanych adresów (blacklist).</li>
        <li>Ograniczaj możliwość wykonywania żądań HTTP tylko do zaufanych zewnętrznych zasobów.</li>
        <li>Używaj mechanizmów uwierzytelniania i autoryzacji, aby kontrolować dostęp do wewnętrznych zasobów.</li>
        <li>Monitoruj i loguj wszystkie żądania HTTP wykonywane przez serwer, aby wykryć podejrzane aktywności.</li>
        <li>Używaj zapór sieciowych (firewall) i innych mechanizmów ochrony sieci, aby ograniczyć dostęp do wewnętrznych zasobów.</li>
      </ul>
      <h2 className="header">Dodatkowe zasoby</h2>
      <ul className="description">
        <li><a href="https://owasp.org/www-project-top-ten/">OWASP Top Ten</a></li>
        <li><a href="https://owasp.org/www-project-server-side-request-forgery-prevention-cheat-sheet/">OWASP SSRF Prevention Cheat Sheet</a></li>
        <li><a href="https://cwe.mitre.org/data/definitions/918.html">CWE-918: Server-Side Request Forgery (SSRF)</a></li>
      </ul>
    </div>
  );
}

export default A10Secure;