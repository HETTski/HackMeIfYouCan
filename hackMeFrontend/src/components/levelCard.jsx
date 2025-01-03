import './levelCard.css';
import { useNavigate } from 'react-router-dom';

function LevelCard(props) {
  const navigate = useNavigate();

  return (
    <div className="level-card">
      <button
        className="levelButton"
        onClick={() => navigate(props.link)}
    >
        <h1>{props.level}</h1>
      </button>
    </div>
  );
}

export default LevelCard;
