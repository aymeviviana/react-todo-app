import React from 'react'
import './App.css'
import TodoGroups from '../TodoGroups/TodoGroups';
import TodoArea from '../TodoArea/TodoArea';
import Modal from '../Modal/Modal';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import { ALL_TODOS_SECTION, ALL_TODOS_GROUP } from '../../constants';
import useTodos from '../../hooks/useTodos';

function App() {
  const [isAddTodoModalActive, setIsAddTodoModalActive] = React.useState(false);
  const [allTodos, addTodo, updateTodo, deleteTodo, activeGroup, updateActiveGroup] = useTodos();
  
  const displayAddTodoModal = () => setIsAddTodoModalActive(true);
  const removeAddTodoModal = () => setIsAddTodoModalActive(false);

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