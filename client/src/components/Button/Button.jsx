import React from 'react';
import styles from './Button.module.css';

function Button({ displayAddTodoModal }) { 

  return (
    <button
      className={styles.button}
      onClick={displayAddTodoModal}
    >
      Add Todo
    </button>
  );
}

export default Button;