import React from 'react';
import styles from './TodoGroups.module.css';
import TodoGroupsSection from '../TodoGroupsSection/TodoGroupsSection';
import { getAllTodoGroups } from '../../utils/todoGroupsHelpers';
import { getCompletedTodoGroups } from '../../utils/todoGroupsHelpers';
import { getTodoGroupsTotal } from '../../utils/todoGroupsHelpers';
import { ALL_TODOS_SECTION, COMPLETED_TODOS_SECTION } from '../../constants';
import { ALL_TODOS_CLASS, COMPLETED_TODOS_CLASS } from '../../constants';

function TodoGroups({ allTodos, activeGroup, updateActiveGroup }) { 
  const allTodoGroups = getAllTodoGroups(allTodos);
  const allTodoGroupsTotal = getTodoGroupsTotal(allTodoGroups);

  const completedTodoGroups = getCompletedTodoGroups(allTodos);
  const completedTodoGroupsTotal = getTodoGroupsTotal(completedTodoGroups);

  return (
    <div className={styles.sidebar}>
      <TodoGroupsSection
        sectionName={ALL_TODOS_SECTION}
        sectionClass={ALL_TODOS_CLASS}
        sectionTodoTotal={allTodoGroupsTotal}
        activeGroup={activeGroup}
        todoGroups={allTodoGroups}
        onGroupClick={updateActiveGroup}
      />

      <TodoGroupsSection
        sectionName={COMPLETED_TODOS_SECTION}
        sectionClass={COMPLETED_TODOS_CLASS}
        sectionTodoTotal={completedTodoGroupsTotal}
        activeGroup={activeGroup}
        todoGroups={completedTodoGroups}
        onGroupClick={updateActiveGroup}
      />
    </div>
  );
}

export default TodoGroups;