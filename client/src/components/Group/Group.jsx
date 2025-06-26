import React from 'react';
import styles from './Group.module.css';

function Group({activeGroup, groupSection, groupName, groupTotal, onGroupClick}) { 
  const isCurrentGroupActive = activeGroup.section === groupSection && activeGroup.name === groupName;
  
  return (
    <dl 
      data-section={groupSection}
      data-group={groupName}
      data-total={groupTotal}
      className={`${styles.groupWrapper} ${isCurrentGroupActive ? styles.active : ""}`}
      onClick={()=> onGroupClick(groupSection, groupName, groupTotal)}
    >
      <dt className={styles.groupName}>
        <time>{groupName}</time>
      </dt>
      <dd className={styles.groupTotal}>{groupTotal}</dd>
    </dl>
  );
}

export default Group;