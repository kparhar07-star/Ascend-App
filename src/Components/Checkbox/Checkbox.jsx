import styles from './Checkbox.module.css';

const imgCheckbox = "https://www.figma.com/api/mcp/asset/418834ed-eadf-4390-bb71-ea1fd331afea";

function Checkbox({ checked = false, onChange }) {
  return (
    <button 
      className={styles.checkboxButton} 
      onClick={onChange}
      aria-label="Toggle task completion"
    >
      <div className={styles.checkboxInner}>
        {checked && <img src={imgCheckbox} alt="" />}
      </div>
    </button>
  );
}

export default Checkbox;
