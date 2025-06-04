import React from 'react';
import styles from './Group.module.css';

function Group({activeGroup, groupSection, groupName, groupCount, handleGroupClick}) { 
  return (
    <dl 
      data-section={groupSection}
      data-group={groupName}
      data-total={groupCount}
      className={activeGroup.section === groupSection && activeGroup.name === groupName ? styles.active : ""}
      onClick={handleGroupClick}
    >
      <dt><time>{groupName}</time></dt>
      <dd>{groupCount}</dd>
    </dl>
  );
}

export default Group;