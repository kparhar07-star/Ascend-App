import { useState } from "react";
import styles from "./Journal.module.css";
import JournalEntry from "../../Components/JournalEntry/JournalEntry";

export default function Journal({ entries, onAdd, onDelete, onUpdate }) {
  const [entry, setEntry] = useState("");

  const handleAddEntry = () => {
    if (entry.trim()) {
      onAdd(entry);
      setEntry("");
    }
  };

  const clearEntry = () => {
    setEntry("");
  };

  return (
    <div className={styles.journalContainer}>
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Write a Journal</h1>
        <button className={styles.addButton} onClick={handleAddEntry}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Input Section */}
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Write about your day..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className={styles.inputField}
            onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
          />
          {entry && (
            <button className={styles.clearButton} onClick={clearEntry}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Entries List */}
      <div className={styles.entriesList}>
       {entries && entries.map((e) => (
         <JournalEntry 
            key={e.id} 
            entry={e} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
         />
       ))}
       {(!entries || entries.length === 0) && (
         <p className="text-gray-500 text-sm text-center mt-10">
           No journal entries yet. Start writing above!
         </p>
       )}
     </div>
   </div>
  );
}
