import { useState } from "react";
import styles from "./Journal.module.css";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddEntry = () => {
    if (entry.trim()) {
      setEntries(prev => [
        ...prev,
        {
          id: Date.now(),
          text: entry,
          date: new Date().toLocaleDateString()
        }
      ]);
      setEntry("");
    }
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(item => item.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    setEntries(prev =>
      prev.map(item =>
        item.id === editingId ? { ...item, text: editingText } : item
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className={styles.journalContainer}>
      
      {/* Top Bar */}
<div className="w-full flex justify-center relative mb-6">
  <h1 className={styles.title}>Journal</h1>

  {/* Add Button - floats on right */}
  <button
    className={`${styles.addButton} absolute right-0`}
    onClick={handleAddEntry}
  >
    <span className="text-white text-2xl leading-none">+</span>
  </button>
</div>
   {/* Centered Content Wrapper */}
   <div className={styles.journalContent}>
     {/* Input */}
     <div className={styles.inputSection}>
       <input
         type="text"
         placeholder="Write about your day..."
         value={entry}
         onChange={(e) => setEntry(e.target.value)}
         className={styles.inputField}
       />
     </div>
     {/* Entries */}
     <div className="space-y-4">
       {entries.map((e) => (
         <div
           key={e.id}
           className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex justify-between items-start"
         >
           <div className="flex-1 pr-3">
             {editingId === e.id ? (
               <input
                 className="w-full bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                 value={editingText}
                 onChange={(ev) => setEditingText(ev.target.value)}
               />
             ) : (
               <>
                 <p className="text-gray-100">{e.text}</p>
                 <span className="text-gray-400 text-sm">{e.date}</span>
               </>
             )}
           </div>
           <div className="flex gap-2">
             {editingId === e.id ? (
               <>
                 <button
                   onClick={saveEdit}
                   className="px-3 py-1 rounded-md bg-green-600/80 hover:bg-green-600 text-white text-xs font-medium transition"
                 >
                   Save
                 </button>
                 <button
                   onClick={cancelEdit}
                   className="px-3 py-1 rounded-md bg-gray-600/60 hover:bg-gray-600 text-white text-xs font-medium transition"
                 >
                   Cancel
                 </button>
               </>
             ) : (
               <>
                 <button
                   onClick={() => startEditing(e.id, e.text)}
                   className="px-2 py-1 rounded-md bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-medium transition"
                 >
                   Edit
                 </button>
                 <button
                   onClick={() => handleDelete(e.id)}
                   className="px-2 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition"
                 >
                   ✕
                 </button>
               </>
             )}
           </div>
         </div>
       ))}
       {entries.length === 0 && (
         <p className="text-gray-500 text-sm">
         No journal entries yet.
       </p>
       
       )}
     </div>
   </div>
 </div>
  );
}
