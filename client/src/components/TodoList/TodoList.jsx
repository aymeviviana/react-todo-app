import React from 'react';
import styles from './TodoList.module.css';
import Todo from '../Todo/Todo';
import Modal from '../Modal/Modal';
import UpdateTodoForm from '../UpdateTodoForm/UpdateTodoForm';
import { getActiveGroupTodos } from '../../utils/todoListHelpers';

function TodoList({ activeGroup, allTodos, deleteTodo, updateTodo }) {
  const [isUpdateTodoModalActive, setIsUpdateTodoModalActive] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState(null);

  const activeGroupTodos = getActiveGroupTodos(activeGroup, allTodos);
  const removeUpdateTodoModal = () => setIsUpdateTodoModalActive(false);
  
  const displayUpdateTodoModal = (todo) => { 
    setEditingTodo(todo);
    setIsUpdateTodoModalActive(true);
  };

  function handleUpdateTodoFormSubmit(updatedTodo) { 
    updateTodo(updatedTodo, updatedTodo.id);
    removeUpdateTodoModal();
    setEditingTodo(null);
  }

  return (
    <main>
      <table cellSpacing="0">
        <tbody>
          {activeGroupTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              displayUpdateTodoModal={displayUpdateTodoModal}
            />
          ))}
        </tbody>
      </table>
      {isUpdateTodoModalActive && editingTodo && (
        <Modal removeModal={removeUpdateTodoModal}>
          <UpdateTodoForm
            todo={editingTodo}
            onSubmit={handleUpdateTodoFormSubmit}
          />
        </Modal>
      )}
    </main>
  );
}

export default TodoList;