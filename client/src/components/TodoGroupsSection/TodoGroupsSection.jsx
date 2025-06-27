import React from 'react';
import styles from './TodoGroupsSection.module.css';
import Group from '../Group/Group';

function TodoGroupsSection({ sectionName, sectionClass, sectionTodoTotal, activeGroup, todoGroups, onGroupClick }) { 
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
            data-total={sectionTodoTotal}
            className={styles.sectionHeaderWrapper}
            onClick={() => onGroupClick(sectionName, sectionName, sectionTodoTotal)}
          >
          <dt className={styles.sectionName}>{sectionName}</dt>
          <dd className={styles.sectionTotal}>{sectionTodoTotal}</dd>
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
            onGroupClick={onGroupClick}
          >
          </Group>
        ))}
      </article>
    </section>
  );
}

export default TodoGroupsSection;