import React from 'react';
import styles from './TodoList.module.css';
import Todo from '../Todo/Todo';
import Modal from '../Modal/Modal';
import UpdateTodoForm from '../UpdateTodoForm/UpdateTodoForm';
import { ALL_TODOS_SECTION, ALL_TODOS_GROUP } from '../../constants';
import { COMPLETED_TODOS_SECTION, COMPLETED_TODOS_GROUP } from '../../constants';

function TodoList({ activeGroup, allTodos, deleteTodo, updateTodo }) {
  const [isUpdateTodoModalActive, setIsUpdateTodoModalActive] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState(null);

  
  function getTodosWithNoDueDate(todos) { 
    return todos.filter(({ month, year }) => !month || !year);
  }

  function getTodosWithDueDate(todos) { 
    return todos.filter(({ month, year }) => { 
      return month === activeGroup.name.slice(0, 2) && year.slice(2) === activeGroup.name.slice(3);
    });
  }
  
  function getGroupTodos(todos, groupName) { 
    let groupTodos;

    if (activeGroup.name === groupName) {
      groupTodos = todos;
    } else if (activeGroup.name === "No Due Date") {
      groupTodos = getTodosWithNoDueDate(todos)
    } else { 
      groupTodos = getTodosWithDueDate(todos);
    }

    return groupTodos;
  }
  
  function getActiveGroupTodos(activeGroup) { 
    let groupTodos;

    if (activeGroup.section === ALL_TODOS_SECTION) {
      groupTodos = getGroupTodos(allTodos, ALL_TODOS_GROUP);
    } else if (activeGroup.section === COMPLETED_TODOS_SECTION) {
      const completedTodos = allTodos.filter(({ completed }) => completed);
      groupTodos = getGroupTodos(completedTodos, COMPLETED_TODOS_GROUP);
    }

    return groupTodos;
  }

  const activeGroupTodos = getActiveGroupTodos(activeGroup);
  
  const removeUpdateTodoModal = () => setIsUpdateTodoModalActive(false);
  
  const displayUpdateTodoModal = (todo) => { 
    setEditingTodo(todo);
    setIsUpdateTodoModalActive(true);
  };

  function handleFormSubmit(updatedTodo) { 
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
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </main>
  );
}

export default TodoList;