import React from 'react';
import styles from './TodoArea.module.css';
import MainHeader from './MainHeader';
import Button from './Button';
import TodoList from './TodoList';

function TodoArea({ activeGroup, allTodos, displayAddTodoModal, deleteTodo, updateTodo }) { 

  return (
    <div id={styles.todos_area}>
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