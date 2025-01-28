import React from "react";
import './leaks.css';

function A06Secure() {
  return (
    <div className="leakContent">
      <h1 className="header">Dlaczego należy unikać korzystania z przestarzałych API i komponentów</h1>
      <p className="description">
        Korzystanie z przestarzałych API i komponentów może wprowadzać znaczące ryzyka bezpieczeństwa i inne problemy do Twojej aplikacji. Ważne jest, aby utrzymywać oprogramowanie na bieżąco, aby zapewnić najlepszą wydajność, bezpieczeństwo i kompatybilność.
      </p>
      <h2 className="header">Ryzyka związane z korzystaniem z przestarzałych API i komponentów</h2>
      <ul className="description">
        <li><strong>Luki bezpieczeństwa:</strong> Przestarzałe komponenty mogą mieć znane luki bezpieczeństwa, które mogą być wykorzystane przez atakujących.</li>
        <li><strong>Problemy z kompatybilnością:</strong> Starsze API i komponenty mogą nie być kompatybilne z nowszymi technologiami, co prowadzi do problemów z integracją.</li>
        <li><strong>Brak wsparcia:</strong> Przestarzałe oprogramowanie może nie być już wspierane przez dostawcę, co oznacza brak poprawek bezpieczeństwa i aktualizacji.</li>
        <li><strong>Spadek wydajności:</strong> Nowsze wersje oprogramowania często zawierają ulepszenia wydajności, które nie są obecne w starszych wersjach.</li>
        <li><strong>Ryzyka związane z zgodnością:</strong> Korzystanie z przestarzałego oprogramowania może narazić Cię na ryzyko niezgodności z normami i regulacjami branżowymi.</li>
      </ul>
      <h2 className="header">Najlepsze praktyki, aby być na bieżąco</h2>
      <ul className="description">
        <li>Regularnie sprawdzaj aktualizacje i poprawki dla wszystkich komponentów oprogramowania.</li>
        <li>Używaj narzędzi do zarządzania zależnościami, aby zautomatyzować proces aktualizacji.</li>
        <li>Subskrybuj biuletyny bezpieczeństwa i powiadomienia, aby być na bieżąco z lukami bezpieczeństwa.</li>
        <li>Testuj aktualizacje w środowisku testowym przed wdrożeniem na produkcję.</li>
        <li>Utrzymuj inwentarz wszystkich komponentów oprogramowania i ich wersji.</li>
      </ul>
      <h2 className="header">Dodatkowe zasoby</h2>
      <ul className="description">
        <li><a href="https://owasp.org/www-project-top-ten/">OWASP Top Ten</a></li>
        <li><a href="https://cwe.mitre.org/data/definitions/937.html">CWE-937: OWASP Top Ten 2017 Category A9 - Korzystanie z komponentów z znanymi lukami</a></li>
        <li><a href="https://www.cisa.gov/uscert/">US-CERT: United States Computer Emergency Readiness Team</a></li>
      </ul>
    </div>
  );
}

export default A06Secure;