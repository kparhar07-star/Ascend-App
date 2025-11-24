
import { useNavigate } from 'react-router-dom';
import penIcon from '../../assets/pen.svg';

export default function JournalInput() {
    const navigate = useNavigate();
    return (
        <div className="home-section">
          <h2 className="section-title">Journal</h2>
          <button onClick={() => navigate('/journal')} className="journal-button">
            <p className="journal-placeholder">Write about your day...</p>
            <div className="journal-icon">
              <img src={penIcon} alt="write" />
            </div>
          </button>
        </div>
    );
 }