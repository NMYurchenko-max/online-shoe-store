import React from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  show: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.preloader}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default Preloader;

