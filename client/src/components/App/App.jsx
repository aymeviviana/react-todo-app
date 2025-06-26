import React from 'react'
import './App.css'
import TodoGroups from '../TodoGroups/TodoGroups';
import TodoArea from '../TodoArea/TodoArea';
import Modal from '../Modal/Modal';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import { sortTodos } from '../../utils/todosHelpers.jsx';
import { ALL_TODOS_SECTION } from '../../constants';
import { ALL_TODOS_GROUP } from '../../constants';
import { ENDPOINT } from '../../constants';


function App() {
  const [isAddTodoModalActive, setIsAddTodoModalActive] = React.useState(false);
  const [allTodos, setAllTodos] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState({section: ALL_TODOS_SECTION, name: ALL_TODOS_GROUP, total: ""});
  
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

  const displayAddTodoModal = () => setIsAddTodoModalActive(true);
  const removeAddTodoModal = () => setIsAddTodoModalActive(false);

  const updateActiveGroup = (sectionName, groupName, todoTotal) => { 
    setActiveGroup({section: sectionName, name: groupName, total: todoTotal})
  }

  const addTodo = (todo) => {
    const nextTodos = [...allTodos, todo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const deleteTodo = (todoId) => { 
    const nextTodos = allTodos.filter(({ id }) => id !== todoId);
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
    updateActiveGroup(activeGroup.section, activeGroup.name, nextTodos.length);
  };

  const updateTodo = (newTodo, todoId) => { 
    const filteredTodos = allTodos.filter(({ id }) => id !== todoId);
    const nextTodos = [...filteredTodos, newTodo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  function handleAddTodoFormSubmit(todo) { 
    removeAddTodoModal();
    addTodo(todo);
    updateActiveGroup(ALL_TODOS_SECTION, ALL_TODOS_GROUP, allTodos.length + 1);
  }

  return (
    <>
      <TodoGroups
        allTodos={allTodos}
        activeGroup={activeGroup}
        updateActiveGroup={updateActiveGroup}
      />
      <TodoArea
        activeGroup={activeGroup}
        allTodos={allTodos}
        displayAddTodoModal={displayAddTodoModal}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />      
      {isAddTodoModalActive &&
        <Modal
          removeModal={removeAddTodoModal}
        >
          <AddTodoForm
            onSubmit={handleAddTodoFormSubmit}
          />
        </Modal>}
    </>
    
  );
}

export default App