import React from 'react';
import styles from './TodoGroupsSection.module.css';
import Group from '../Group/Group';

function TodoGroupsSection({ sectionName, sectionClass, activeGroup, todoGroups, todoGroupsTotal, handleGroupClick }) { 
  const isHeaderGroupActive = activeGroup.section === sectionName && activeGroup.name === sectionName;
  return (
    <section className={`${styles.sectionWrapper} ${styles[sectionClass]}`}>
      <div className={styles.cursor}>
        <header
          className={`${styles.sectionHeader} ${isHeaderGroupActive ? styles.active : ""}`}
        >
          <dl
            data-section={sectionName}
            data-group={sectionName}
            data-total={todoGroupsTotal}
            className={styles.sectionHeaderWrapper}
            onClick={handleGroupClick}
          >
          <dt className={styles.sectionName}>{sectionName}</dt>
          <dd className={styles.sectionTotal}>{todoGroupsTotal}</dd>
          </dl>
        </header>
      </div>
      <article>
        {todoGroups.map(([ groupName, groupTotal ]) => (
          <Group
            key={groupName}
            activeGroup={activeGroup}
            groupSection={sectionName}
            groupName={groupName}
            groupTotal={groupTotal}
            handleGroupClick={handleGroupClick}
          >
          </Group>
        ))}
      </article>
    </section>
  );
}

export default TodoGroupsSection;