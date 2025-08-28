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
