import React from 'react';
import styles from './Button.module.css';

function Button({ displayAddTodoModal }) { 

  return (
    <button onClick={displayAddTodoModal}>
      Add Todo
    </button>
  );
}

export default Button;