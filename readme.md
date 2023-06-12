# TASKS LIST APP

## Installation guide

- Clone the repository
- Run from both directories `npm install` or `yarn` to install both app dependencies
- Run from both directories `npm start` or `yarn start` to start both apps

## Database setup

- Create a database and change the database name in `config/config.json` file.
- Change the database credentials in `config/config.json` and also in models files from `models/*` file with your own
  credentials.
- Run `npx sequelize-cli db:migrate` to run the migrations.
- Now you are ready to go.

##### Open `http://localhost:5000` in your browser to see the backend app running.

## Packages used

- express (Express used as a web framework)
- mysql2 (MySQL used as a database)
- sequelize (Sequelize used as an ORM)
- sequelize-cli (Sequelize-cli used to run migrations)
- cors (CORS used to enable cross-origin resource sharing)
- connect-flash (Connect-flash used to flash messages)
- express-session (Express-session used to manage sessions)
- express-validator (Express-validator used to validate form data)
- method-override (Method-override used to override HTTP methods)
- EJS (EJS used as a templating engine)
- nodemon (Nodemon used to restart the server on file changes)

# Features

- MVC architecture
- ORM by using Sequelize
- MySQL database
- Models
- Views
- Controllers
- Request validation / Requests
- Routes
- Session Flash Messages
- Method Override
- Migrations
- View Engine / Templating Engine
- Error Handling
- 404 Error Handling
- 500 Error Handling
- etc & more

## Backend API endpoints

- GET `/tasks` - Get all tasks
- POST `/tasks` - Create a new task
- GET `/tasks/:id` - Get a task by id
- GET `/tasks/:id/edit` - Get a task by id to edit
- PUT `/tasks/:id` - Update a task by id
- DELETE `/tasks/:id` - Delete a task by id

**Note:** The backend app is configured to use PORT 5000. Make sure that this port is not used by any other apps on your
machine.

**Note:** The backend app is configured to use the MySQL database on port 3306. Make sure that this port is not used by
any other apps on your machine.


<h1 style="text-align: center;">
    Thanks for reading and happy coding!
</h1>




