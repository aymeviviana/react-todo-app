import React from 'react';
import styles from './TodoGroups.module.css';
import TodoGroupsSection from '../TodoGroupsSection/TodoGroupsSection';
import { getAllTodoGroups } from '../../utils/todoGroupsHelpers';
import { getCompletedTodoGroups } from '../../utils/todoGroupsHelpers';
import { getTodoGroupsTotal } from '../../utils/todoGroupsHelpers';
import { ALL_TODOS_SECTION, COMPLETED_TODOS_SECTION } from '../../constants';
import { ALL_TODOS_CLASS, COMPLETED_TODOS_CLASS } from '../../constants';

function TodoGroups({ allTodos, activeGroup, setActiveGroup }) { 
  const allTodoGroups = getAllTodoGroups(allTodos);
  const allTodoGroupsTotal = getTodoGroupsTotal(allTodoGroups);

  const completedTodoGroups = getCompletedTodoGroups(allTodos);
  const completedTodoGroupsTotal = getTodoGroupsTotal(completedTodoGroups);
  
  function handleGroupClick(event) { 
    const currentSection = event.currentTarget.dataset.section;
    const currentGroup = event.currentTarget.dataset.group;
    const currentTotal = event.currentTarget.dataset.total;
    setActiveGroup({ section: currentSection, name: currentGroup, total: currentTotal});
  }

  return (
    <div className={styles.sidebar}>
      <TodoGroupsSection
        sectionName={ALL_TODOS_SECTION}
        sectionClass={ALL_TODOS_CLASS}
        activeGroup={activeGroup}
        todoGroups={allTodoGroups}
        todoGroupsTotal={allTodoGroupsTotal}
        handleGroupClick={handleGroupClick}
      />

      <TodoGroupsSection
        sectionName={COMPLETED_TODOS_SECTION}
        sectionClass={COMPLETED_TODOS_CLASS}
        activeGroup={activeGroup}
        todoGroups={completedTodoGroups}
        todoGroupsTotal={completedTodoGroupsTotal}
        handleGroupClick={handleGroupClick}
      />
    </div>
  );
}

export default TodoGroups;