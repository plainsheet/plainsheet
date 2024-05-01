"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

import { createBottomSheet } from "plain-bottom-sheet-core";

export default function Home() {
  useEffect(() => {
    const bottomSheet = createBottomSheet({
      content: "Hi",
    });

    bottomSheet.mount();
    bottomSheet.open();
  }, []);
  return <main className={styles.main}></main>;
}
