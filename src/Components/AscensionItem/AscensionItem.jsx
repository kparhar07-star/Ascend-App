import { useState } from "react";
import styles from './AscensionItem.module.css';

export default  function AscensionItem(){
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div className={styles.ascensionItem}>
            
        </div>
    );
}
