import React from 'react';
import styles from './TodoArea.module.css';
import MainHeader from '../MainHeader/MainHeader';
import Button from '../Button/Button';
import TodoList from '../TodoList/TodoList';

function TodoArea({ activeGroup, allTodos, displayAddTodoModal, deleteTodo, updateTodo }) { 

  return (
    <div className={styles.todosArea}>
      <MainHeader
        groupName={activeGroup.name}
        total={activeGroup.total}
      />

      <Button displayAddTodoModal={displayAddTodoModal}/>
          
      <TodoList
        activeGroup={activeGroup}
        allTodos={allTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoArea;