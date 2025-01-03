import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="navbarHeader" onClick={() => navigate('/')}>
        HackMeIfYouCan
      </h1>
    </div>
  );
}

export default Navbar;