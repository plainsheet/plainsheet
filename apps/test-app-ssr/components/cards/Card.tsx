import { ReactNode } from 'react';
import styles from './cards.module.css';

export function Card({ children }: { children: ReactNode }) {
  return <div className={styles.card}>{children}</div>;
}
