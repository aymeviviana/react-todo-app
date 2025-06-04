## HOW TO START THE APPLICATION

The `todo` app is split up into two main directories:

- `client`: React App
- `server`: Express App

The Express app contains a very old `package.json` file so it requires an old version of node to run. To start the entire application you'll need start the `client` and `server` applications separately.

## Express App

1. From your terminal, navigate to the project's `server` directory and run command `nvm use 10.24.1`.
2. To install dependencies run `npm install`.
3. To start the server run command `npm start`.
4. From your browser, request [`localhost:3001/doc`](http://localhost:3001/doc). This should open up the `Todos Backend API Documentation`.

## React App

1. From your terminal, navigate to the project's `client` directory and run command `npm install` to install dependencies.

2. To start the app run command `npm run dev`.

3. From your browser, request [`localhost:5173`](http://localhost:5173/). This should open up the `todo` application interface.

## API DOCUMENTATION

- Access the Express API documentation at [`localhost:3001/doc`](http://localhost:3001/doc/)

- Access a list of the current todos at [`localhost:3001/api/todos`](http://localhost:3001/api/todos)

## PROJECT REQUIREMENTS:

### Main Area

1. Clicking on `Add Todo` shows the modal
2. Displays the current selected "todo group" with the corresponding count of todos
3. Hovering on a todo item highlights the todo. Clicking on the area surrounding the todo name toggles the todo state (complete/not complete).
4. The todo name displayed on the todo list is of the following form - "{title} - {month}/{year}" (i.e., Item 1 - 02/15). If the todo doesn't have both a month and year, the todo name displayed is of the form "{title} - No Due Date" (i.e., Item 3 - No Due Date). Hovering over the todo name highlights the text. Clicking it shows the modal with the corresponding todo details
5. Hovering on the trash bin area highlights it. Clicking on the trash bin or its surrounding area deletes the todo both on the server and in the browser.
6. When a todo is toggled/deleted the currently selected todo group should not change. The todos in the main area should reflect what is currently selected, and the corresponding count of todos should reflect the count accordingly.
7. Completed todos should be on the bottom of the list.

### Nav Area

1. The `nav` area lists all the available "todo groups." There are two major group listings: (1) All Todos and (2) Completed.
2. The todo groups are sorted by date in ascending order, with the "No Due Date" group coming first on the list.
3. The corresponding count of "todo items" for the respective "todo group" is displayed
4. Clicking on a "todo group" selects it and updates the content on the `main` area accordingly

### Modal Specs

1. The modal displays the appropriate content.
   - when adding a new item, the fields should be empty with placeholder texts.
   - when clicking on an existing item, the fields should contain the todo detail where available.
2. Clicking "Save" closes the modal:
   - when adding a new item, it selects the "All Todos" group from the `nav` area.
   - when clicking on an existing item, it retains the currently selected group.
   - all created/updated todos are listed under "No Due Date" unless it contains data for both the `month` and `year` fields.
   - it allows resetting a todo's details back to their default values. As an example, a user could move a todo with a date of `02/23` to the "No Due Date" category by resetting its `month` and `year` fields.
   - it saves the details that were provided accordingly.
3. Clicking "Mark As Complete":
   - when adding a new item, it alerts the user that it can not be done.
   - when clicking on an existing item, it marks the todo as completed.
4. Clicking anywhere outside the modal closes it.
