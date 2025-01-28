import React from "react";
import './leaks.css';

function A04Secure() {
  return (
    <div className="leakContent">
      <h1 className="header">How to Prevent OWASP A4 Insecure Design</h1>
      <p className="description">
        Insecure design refers to flaws in the design of software that can lead to security vulnerabilities. It is important to incorporate security into the design phase to prevent such issues.
      </p>
      <h2 className="header">Best Practices to Prevent Insecure Design</h2>
      <ul className="description">
        <li>Adopt a Secure Development Lifecycle (SDLC)</li>
        <li>Perform Threat Modeling</li>
        <li>Use Secure Design Patterns</li>
        <li>Conduct Regular Security Reviews</li>
        <li>Implement Security Requirements</li>
        <li>Use Security Frameworks and Libraries</li>
        <li>Ensure Proper Authentication and Authorization</li>
        <li>Validate and Sanitize User Inputs</li>
        <li>Use Encryption for Sensitive Data</li>
        <li>Regularly Update and Patch Systems</li>
      </ul>
      <h2 className="header">Additional Resources</h2>
      <ul className="description">
        <li><a href="https://owasp.org/www-project-top-ten/">OWASP Top Ten</a></li>
        <li><a href="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/">OWASP Secure Coding Practices</a></li>
        <li><a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS</a></li>
      </ul>
    </div>
  );
}

export default A04Secure;