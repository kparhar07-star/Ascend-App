import { useState } from 'react';
import styles from './JournalEntry.module.css';

export default function JournalEntry({ entry, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(entry.content);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  };

  const handleCardClick = (e) => {
    // Prevent expansion if clicking buttons or input
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'svg' || e.target.tagName === 'path') return;
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setIsExpanded(true); // Ensure content is visible when editing
  };

  const handleSave = () => {
    onUpdate(entry.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(entry.content);
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(entry.id);
  };

  return (
    <div className={styles.entryCard} onClick={handleCardClick}>
      <div className={styles.header}>
        <h3 className={styles.dateHeading}>{formatDate(entry.created_at)}</h3>
        <div className="flex items-center gap-2">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className="text-gray-400 hover:text-white transition-colors"
            >
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <input
                className={styles.editInput}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <div className={styles.actions}>
                <button onClick={handleSave} className={`${styles.actionButton} ${styles.saveButton}`}>Save</button>
                <button onClick={handleCancel} className={`${styles.actionButton} ${styles.cancelButton}`}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap">{entry.content}</p>
              <div className={styles.actions}>
                <button onClick={handleStartEdit} className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                <button onClick={handleDelete} className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
