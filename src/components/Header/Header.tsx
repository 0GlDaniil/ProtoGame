import { FC } from "react";
import styles from './Header.module.scss';

interface Props {
  online: boolean;
}

const Header: FC<Props> = ({online}) => {
  return ( 
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Spirit watcher</h1>
        <div 
        className={`${styles.statusIndicator} ${online ? styles['statusIndicator--online'] : styles['statusIndicator--offline']}`}
        role="status"
        aria-live="polite"
        aria-label={online ? "Система онлайн" : "Система офлайн"}
        >
          {online ? '● Online' : '● Offline'}
        </div>
      </div>
    </header>
  );
}

export default Header;