export function sortTodos(todos) { 
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