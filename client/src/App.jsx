import React from 'react'
import './App.css'
import TodoGroups from './TodoGroups';
import TodoArea from './TodoArea';
import Modal from './Modal';
import AddTodoForm from './AddTodoForm';
import { ALL_TODOS_SECTION } from './constants';
import { ALL_TODOS_GROUP } from './constants';
import { ENDPOINT } from './constants';

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
        sortTodos(todos);
        setAllTodos(todos);
        setActiveGroup({ section: ALL_TODOS_SECTION, name: ALL_TODOS_GROUP, total: todos.length });
      } catch (error) { 
        console.log(`Encountered an Error: ${error.message}`)
      }
    }

    fetchAllTodos();
  }, []);

  function sortTodos(todos) { 
    todos.sort((todo1, todo2) => { 
      let todo1Status = todo1.completed ? 1 : -1;
      let todo2Status = todo2.completed ? 1 : -1;

      let todo1Id = parseInt(todo1.id);
      let todo2Id = parseInt(todo2.id);

      if (todo1Status === todo2Status) {
        return todo1Id - todo2Id;
      } else { 
        return todo1Status - todo2Status;
      }
    });
  }

  const displayAddTodoModal = () => setIsAddTodoModalActive(true);
  const removeAddTodoModal = () => setIsAddTodoModalActive(false);

  const addTodo = (todo) => {
    const nextTodos = [...allTodos, todo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const deleteTodo = (todoId) => { 
    const nextTodos = allTodos.filter(({ id }) => id !== todoId);
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const updateTodo = (newTodo, todoId) => { 
    const filteredTodos = allTodos.filter(({ id }) => id !== todoId);
    const nextTodos = [...filteredTodos, newTodo];
    sortTodos(nextTodos);
    setAllTodos(nextTodos);
  };

  const resetActiveGroup = () => { 
    setActiveGroup({section: ALL_TODOS_SECTION, name: ALL_TODOS_GROUP, total: allTodos.length + 1})
  }

  return (
    <>
      <TodoGroups
        allTodos={allTodos}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
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
            addTodo={addTodo}
            removeModal={removeAddTodoModal}
            resetActiveGroup={resetActiveGroup}
          />
        </Modal>}
    </>
    
  );
}

export default App