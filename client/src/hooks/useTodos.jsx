import React from 'react';
import { sortTodos } from '../utils/todosHelpers.jsx';
import { ENDPOINT } from '../constants';
import { ALL_TODOS_SECTION, COMPLETED_TODOS_SECTION } from '../constants';
import { ALL_TODOS_GROUP, COMPLETED_TODOS_GROUP } from '../constants';
import { getAllTodoGroups, getCompletedTodoGroups, getTodoGroupsTotal } from '../utils/todoGroupsHelpers.jsx';

function useTodos() { 
  const [allTodos, setAllTodos] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState({
    section: ALL_TODOS_SECTION,
    name: ALL_TODOS_GROUP,
    total: ""
  });
  
  React.useEffect(() => { 
    async function fetchAllTodos() { 
      try {
        const response = await fetch(ENDPOINT);
        
        if (!response.ok) { 
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const todos = await response.json();
        const todosTotal = todos.length;
        sortTodos(todos);
        setAllTodos(todos);
        updateActiveGroup(ALL_TODOS_SECTION, ALL_TODOS_GROUP, todosTotal);
      } catch (error) { 
        console.log(`Encountered an Error: ${error.message}`)
      }
    }

    fetchAllTodos();
  }, []);

  const addTodo = (todo) => {
    const nextTodos = [...allTodos, todo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const deleteTodo = (todoId) => { 
    const nextTodos = allTodos.filter(({ id }) => id !== todoId);
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
    const todoTotal = getActiveGroupTodoTotal(activeGroup, nextTodos);
    updateActiveGroup(activeGroup.section, activeGroup.name, todoTotal);
  };

  const updateTodo = (newTodo, todoId) => { 
    const filteredTodos = allTodos.filter(({ id }) => id !== todoId);
    const nextTodos = [...filteredTodos, newTodo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const updateActiveGroup = (sectionName, groupName, todoTotal) => { 
    setActiveGroup({section: sectionName, name: groupName, total: todoTotal})
  }

  function getActiveGroupTodoTotal(activeGroup, nextTodos) { 
    let todoTotal;
    
    const sectionTodos = activeGroup.section === ALL_TODOS_SECTION
      ? getAllTodoGroups(nextTodos)
      : getCompletedTodoGroups(nextTodos);

    if (activeGroup.name === ALL_TODOS_GROUP || activeGroup.name === COMPLETED_TODOS_GROUP) { 
      todoTotal = getTodoGroupsTotal(sectionTodos);
    } else {
      const [ groupName, count] = sectionTodos.find(([groupName, _]) => activeGroup.name === groupName);
      todoTotal = count;
    }

    return todoTotal;
  }

  return [allTodos, addTodo, updateTodo, deleteTodo, activeGroup, updateActiveGroup];
}

export default useTodos;