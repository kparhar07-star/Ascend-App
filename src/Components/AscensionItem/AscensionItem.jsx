import Checkbox from '../Checkbox/Checkbox';
import styles from './AscensionItem.module.css';

const imgArrowDown = "https://www.figma.com/api/mcp/asset/640b0cb3-cd3b-45ce-8eca-d0bf9d875693";

function AscensionItem({ title, completed = false, onToggle, onExpand }) {
  return (
    <div className={styles.ascensionItem}>
      <Checkbox checked={completed} onChange={onToggle} />
      <p className={styles.ascensionTitle}>{title}</p>
      <button 
        className={styles.ascensionExpand} 
        onClick={onExpand}
        aria-label="Expand task details"
      >
        <img src={imgArrowDown} alt="" />
      </button>
    </div>
  );
}

export default AscensionItem;
