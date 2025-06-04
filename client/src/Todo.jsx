import React from 'react';
import styles from './Todo.module.css';
import { ENDPOINT } from './constants';

function Todo({ todo, deleteTodo, updateTodo, displayUpdateTodoModal }) {
  const inputRef = React.useRef();

  async function handleDeleteTodo(todoId) { 
    try {
      const response = await fetch(`${ENDPOINT}/${todoId}`, { method: "DELETE" });
      
      if (!response.ok) { 
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      deleteTodo(todoId);
    } catch (error) { 
      console.log(`Encountered an error: ${error.message}`);
    }
  }

  async function handleUpdateTodo(id, options) {
    try {
      const response = await fetch(`${ENDPOINT}/${id}`, options);

      if (!response.ok) { 
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const todo = await response.json();
      updateTodo(todo, id);
    } catch (error) { 
      console.log(`Encountered an error: ${error.message}`);
    }
  }

  function updateCompletedStatus(event, id) {       
    if (!['TD', 'SPAN'].includes(event.target.tagName)) {
      return;
    }

    let classList = inputRef.current.classList;
    const nextCompletedStatus = !classList.contains(styles.done);

    const options = {
      method: "PUT",
      body: JSON.stringify({ completed: nextCompletedStatus}),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    }

    handleUpdateTodo(id, options);
  }

  const getDueDate = (month, year) => !month || !year ? "No Due Date" : `${month}/${year.slice(2)}`;

  return (
    <>
      <tr data-id={todo.id}>
        <td
          className={styles.todo_item}
          onClick={(event) => updateCompletedStatus(event, todo.id)}
        >
          <input
            className={ todo.completed ? styles.done : undefined}
            ref={inputRef}
            type="checkbox"
            name={todo.id}
            id={todo.id}
          />
          <span className={styles.check}></span>
          <label
            htmlFor={todo.id}
            className="title"
            onClick={() => displayUpdateTodoModal(todo)}
          >
            {`${todo.title} - ${getDueDate(todo.month, todo.year)}`}
          </label>
        </td>
        <td
          className={styles.delete}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <img src="/src/images/trash.png" alt="Delete" />
        </td>
      </tr>
    </>
  );
}

export default Todo;