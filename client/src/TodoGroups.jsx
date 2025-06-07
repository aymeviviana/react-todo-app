import React from 'react';
import styles from './TodoGroups.module.css';
import TodoGroupsSection from './TodoGroupsSection';
import { ALL_TODOS_SECTION, COMPLETED_TODOS_SECTION } from './constants';
import { ALL_TODOS_CLASS, COMPLETED_TODOS_CLASS } from './constants';

function TodoGroups({ allTodos, activeGroup, setActiveGroup }) { 
  
  function convertTodosIntoGroups(todos) { 
    let groups = todos.reduce((groupTally, todo) => { 
      if (!todo.month || !todo.year) {
        groupTally["No Due Date"] ||= 0;
        groupTally["No Due Date"] += 1;
      } else { 
        let dueDate = `${todo.month}/${todo.year.slice(2)}`;
        groupTally[dueDate] ||= 0;
        groupTally[dueDate] += 1;
      }
      return groupTally;
    }, {});

    return groups;
  }

  function sortGroups(groupsArray) { 
    groupsArray.sort((group1, group2) => {
      let year1 = parseInt(group1[0].slice(3)); 
      let year2 = parseInt(group2[0].slice(3));

      if (isNaN(year1)) { 
        return -1;
      }
      
      if (year1 !== year2) { 
        return year1 - year2;
      }

      let month1 = parseInt(group1[0].slice(0, 2));
      let month2 = parseInt(group2[0].slice(0, 2));

      return month1 - month2;
    });
  }
  
  function getAllTodoGroups() { 
    const allGroups = convertTodosIntoGroups(allTodos);
    const allGroupsArray = Object.entries(allGroups);
    sortGroups(allGroupsArray);
    return allGroupsArray;
  }

  function getCompletedTodoGroups() { 
    const completedTodos = allTodos.filter(({ completed }) => completed);
    const completedGroups = convertTodosIntoGroups(completedTodos);
    const completedGroupsArray = Object.entries(completedGroups);
    sortGroups(completedGroupsArray);
    return completedGroupsArray;
  }
  function getTodoGroupsTotal(groups) { 
    const groupCountsArray = groups.map(([_, count]) => count);
    return groupCountsArray.length === 0 ? 0 : groupCountsArray.reduce((n1, n2) => n1 + n2);
  }

  const allTodoGroups = getAllTodoGroups();
  const allTodoGroupsTotal = getTodoGroupsTotal(allTodoGroups);

  const completedTodoGroups = getCompletedTodoGroups();
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