import { ALL_TODOS_SECTION } from '../constants';
import { COMPLETED_TODOS_SECTION} from '../constants';

export function getTodosWithNoDueDate(todos) { 
  return todos.filter(({ month, year }) => !month || !year);
}

export function getTodosWithDueDate(todos, activeGroup) { 
  return todos.filter(({ month, year }) => { 
    return month === activeGroup.name.slice(0, 2) && year.slice(2) === activeGroup.name.slice(3);
  });
}

export function getGroupTodos(activeGroup, todos, sectionName) { 
  let groupTodos;

  if (activeGroup.name === sectionName) {
    groupTodos = todos;
  } else if (activeGroup.name === "No Due Date") {
    groupTodos = getTodosWithNoDueDate(todos)
  } else { 
    groupTodos = getTodosWithDueDate(todos, activeGroup);
  }

  return groupTodos;
}

export function getActiveGroupTodos(activeGroup, allTodos) { 
  let groupTodos;

  if (activeGroup.section === ALL_TODOS_SECTION) {
    groupTodos = getGroupTodos(activeGroup, allTodos, ALL_TODOS_SECTION);
  } else if (activeGroup.section === COMPLETED_TODOS_SECTION) {
    const completedTodos = allTodos.filter(({ completed }) => completed);
    groupTodos = getGroupTodos(activeGroup, completedTodos, COMPLETED_TODOS_SECTION);
  }

  return groupTodos;
}