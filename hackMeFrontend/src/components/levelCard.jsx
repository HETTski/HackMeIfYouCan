import './levelCard.css';
import { useNavigate } from 'react-router-dom';

function LevelCard(props) {
  const navigate = useNavigate();

  return (
    <div className={`level-card ${props.isSecure ? 'secure' : ''}`}>
      <button
        className="levelButton"
        onClick={() => navigate(props.link)}
      >
        <h1 className={`levelHeader ${props.isSecure ? 'secure' : '' } `} >{props.level}</h1>
      </button>
    </div>
  );
}

export default LevelCard;
