import React from 'react';
import styles from './TodoGroupsSection.module.css';
import Group from './Group';

function TodoGroupsSection({ sectionName, activeGroup, todoGroups, todoGroupsTotal, handleGroupClick }) { 
  
return (
    <section>
      <div className={styles.cursor}>
        <header
          className={activeGroup.section === sectionName && activeGroup.name === sectionName ? styles.active : ""}
        >
          <dl
            data-section={sectionName}
            data-group={sectionName}
            data-total={todoGroupsTotal}
            onClick={handleGroupClick}
          >
            <dt>{sectionName}</dt>
            <dd>{todoGroupsTotal}</dd>
          </dl>
        </header>
      </div>
      <article>
        {todoGroups.map(([ groupName, groupCount ]) => (
          <Group
            key={groupName}
            activeGroup={activeGroup}
            groupSection={sectionName}
            groupName={groupName}
            groupCount={groupCount}
            handleGroupClick={handleGroupClick}
          >
          </Group>
        ))}
      </article>
    </section>
  );
}

export default TodoGroupsSection;