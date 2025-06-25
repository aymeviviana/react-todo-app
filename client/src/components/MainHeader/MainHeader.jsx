import React from 'react';
import styles from './MainHeader.module.css';

function MainHeader({ groupName, total }) { 
  return (
    <header>
      <dl className={styles.groupWrapper}>
        <dt className={styles.groupNameWrapper}>{groupName}</dt>
        <dd className={styles.groupCountWrapper}>{total}</dd>
      </dl>
    </header>
  );
}

export default MainHeader;