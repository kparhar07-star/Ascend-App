import AscensionInput from "../../Components/AscensionInput/AscensionInput";
import styles from "./Ascension.module.css";

export default function Ascension() {
    return (
        <div className={styles.ascensionContainer}>
            <h2 className={styles.header}>Ascensions</h2>
            <AscensionInput />
        </div>
    );
}
