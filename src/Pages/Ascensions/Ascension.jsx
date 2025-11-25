import AscensionInput from "../../Components/AscensionInput/AscensionInput";
import AscensionItem from "../../Components/AscensionItem/AscensionItem";
import styles from "./Ascension.module.css";

export default function Ascension({ ascensions, onAdd, onDelete }) {
    return (
        <div className={styles.ascensionContainer}>
            <div className={styles.ascensionContent}>
                <h2 className={styles.header}>Ascensions</h2>
                <AscensionInput onAdd={onAdd} />
                <div className={styles.ascensionList}>
                    {ascensions.map((ascension, index) => (
                        <AscensionItem 
                            key={index} 
                            data={ascension} 
                            onDelete={() => onDelete(index)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
