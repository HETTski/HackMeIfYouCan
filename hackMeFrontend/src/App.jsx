import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import LevelCard from './components/levelCard';

import A01 from './components/levels/A01';
import A02 from './components/levels/A02';
import A03 from './components/levels/A03';
import A04 from './components/levels/A04';
import A05 from './components/levels/A05';
import A06 from './components/levels/A06';
import A07 from './components/levels/A07';
import A08 from './components/levels/A08';
import A09 from './components/levels/A09';
import A10 from './components/levels/A10';

import A01Secure from './components/secureLevels/A01Secure';
import A02Secure from './components/secureLevels/A02Secure';
import A03Secure from './components/secureLevels/A03Secure';
import A04Secure from './components/secureLevels/A04Secure';
import A05Secure from './components/secureLevels/A05Secure';
import A06Secure from './components/secureLevels/A06Secure';
import A07Secure from './components/secureLevels/A07Secure';
import A08Secure from './components/secureLevels/A08Secure';
import A09Secure from './components/secureLevels/A09Secure';
import A10Secure from './components/secureLevels/A10Secure';

function App() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (isToggled) {
      document.body.classList.add('secureBackground');
    } else {
      document.body.classList.remove('secureBackground');
    }
  }, [isToggled]);

  const levels = [
    { id: 'A01', name: '2021-Broken Access Control' },
    { id: 'A02', name: '2021-Cryptographic Failures' },
    { id: 'A03', name: '2021-Injection' },
    { id: 'A04', name: '2021-Insecure Design' },
    { id: 'A05', name: '2021-Security Misconfiguration' },
    { id: 'A06', name: '2021-Vulnerable and Outdated Components' },
    { id: 'A07', name: '2021-Identification and Authentication Failures' },
    { id: 'A08', name: '2021-Software and Data Integrity Failures' },
    { id: 'A09', name: '2021-Security Logging and Monitoring Failures' },
    { id: 'A10', name: '2021-Server-Side Request Forgery' },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar isToggled={isToggled} handleToggle={handleToggle} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="level-container">
                {levels.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={`${level.id}: ${level.name}`}
                    link={`/${level.id}`}
                    isSecure={isToggled}
                  />
                ))}
              </div>
            }
          />
          <Route path="/A01" element={isToggled ? <A01Secure /> : <A01 />} />
          <Route path="/A02" element={isToggled ? <A02Secure /> : <A02 />} />
          <Route path="/A03" element={isToggled ? <A03Secure /> : <A03 />} />
          <Route path="/A04" element={isToggled ? <A04Secure /> : <A04 />} />
          <Route path="/A05" element={isToggled ? <A05Secure /> : <A05 />} />
          <Route path="/A06" element={isToggled ? <A06Secure /> : <A06 />} />
          <Route path="/A07" element={isToggled ? <A07Secure /> : <A07 />} />
          <Route path="/A08" element={isToggled ? <A08Secure /> : <A08 />} />
          <Route path="/A09" element={isToggled ? <A09Secure /> : <A09 />} />
          <Route path="/A10" element={isToggled ? <A10Secure /> : <A10 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
