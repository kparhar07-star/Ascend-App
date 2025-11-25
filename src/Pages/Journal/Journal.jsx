import { useState } from "react";
import styles from "./Journal.module.css";

export default function Journal({ entries, onAdd, onDelete, onUpdate }) {
  const [entry, setEntry] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddEntry = () => {
    if (entry.trim()) {
      onAdd(entry);
      setEntry("");
    }
  };

  const clearEntry = () => {
    setEntry("");
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    onUpdate(editingId, editingText);
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString();
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

      {/* Toolbar (Visual only for now) */}
      <div className={styles.toolbarContainer}>
        <div className={styles.toolbar}>
          <button className={styles.toolButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.toolButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="white" fillOpacity="0.2"/>
            </svg>
          </button>
          <button className={styles.toolButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7V4H20V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className={styles.entriesList}>
       {entries && entries.map((e) => (
         <div
           key={e.id}
           className={styles.entryCard}
         >
           <div className="flex-1 pr-3">
             {editingId === e.id ? (
               <input
                 className={styles.editInput}
                 value={editingText}
                 onChange={(ev) => setEditingText(ev.target.value)}
                 autoFocus
               />
             ) : (
               <>
                 <p className={styles.entryContent}>{e.content}</p>
                 <span className={styles.entryDate}>{formatDate(e.created_at)}</span>
               </>
             )}
           </div>
           <div className="flex gap-2">
             {editingId === e.id ? (
               <>
                 <button onClick={saveEdit} className={styles.actionButtonSave}>Save</button>
                 <button onClick={cancelEdit} className={styles.actionButtonCancel}>Cancel</button>
               </>
             ) : (
               <>
                 <button onClick={() => startEditing(e.id, e.content)} className={styles.actionButtonEdit}>Edit</button>
                 <button onClick={() => onDelete(e.id)} className={styles.actionButtonDelete}>✕</button>
               </>
             )}
           </div>
         </div>
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
