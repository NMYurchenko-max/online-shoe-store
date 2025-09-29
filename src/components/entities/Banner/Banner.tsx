import React from 'react';
import styles from './Banner.module.css';
import { type BannerProps } from '@/models/type';

const Banner: React.FC<BannerProps> = ({
  title = 'К весне готовы!',
}) => {
  return (
    <div className={`${styles.banner} ${styles['banner--with-image']}`}>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>{title}</h1>
      </div>
    </div>
  );
};

export default Banner;
