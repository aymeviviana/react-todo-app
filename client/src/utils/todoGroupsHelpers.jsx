export function convertTodosIntoGroups(todos) { 
  let groups = todos.reduce((groupTally, todo) => { 
    if (!todo.month || !todo.year) {
      groupTally["No Due Date"] ||= 0;
      groupTally["No Due Date"] += 1;
    } else { 
      let dueDate = `${todo.month}/${todo.year.slice(2)}`;
      groupTally[dueDate] ||= 0;
      groupTally[dueDate] += 1;
    }
    return groupTally;
  }, {});

  return groups;
}

export function sortGroups(groupsArray) { 
  groupsArray.sort((group1, group2) => {
    let year1 = parseInt(group1[0].slice(3)); 
    let year2 = parseInt(group2[0].slice(3));

    if (isNaN(year1)) { 
      return -1;
    }
    
    if (year1 !== year2) { 
      return year1 - year2;
    }

    let month1 = parseInt(group1[0].slice(0, 2));
    let month2 = parseInt(group2[0].slice(0, 2));

    return month1 - month2;
  });
}

export function getAllTodoGroups(allTodos) { 
  const allGroups = convertTodosIntoGroups(allTodos);
  const allGroupsArray = Object.entries(allGroups);
  sortGroups(allGroupsArray);
  return allGroupsArray;
}

export function getCompletedTodoGroups(allTodos) { 
  const completedTodos = allTodos.filter(({ completed }) => completed);
  const completedGroups = convertTodosIntoGroups(completedTodos);
  const completedGroupsArray = Object.entries(completedGroups);
  sortGroups(completedGroupsArray);
  return completedGroupsArray;
}

export function getTodoGroupsTotal(groups) { 
  const groupCountsArray = groups.map(([_, count]) => count);
  return groupCountsArray.length === 0 ? 0 : groupCountsArray.reduce((n1, n2) => n1 + n2);
}