# Glowing Waffle

> `Glowing Waffle` is a REST API server implementation built on `Node.js` and `Express.js` with `Mongoose.js` for integration with `MongoDB`. Access control follows the specifications of `JWT` (JSON Web Tokens) with the help of `Passport.js`.


## Installation

> To install, you need to have `Node.js` installed on your machine.

1. Clone the repository:

```bash
$ git clone https://github.com/paulozy/glowing-waffle.git
```
2. Access the project folder:

```bash
$ cd glowing-waffle
```

3. Install dependencies:

```bash
$ npm install
```

## Commands

> Commands found in the `package.json` file.

<table>
  <tr>
    <th style="width: 10%">Command</th>
    <th style="width: 30%">Description</th>
  </tr>
  <tr>
    <td>`npm run build`</td>
    <td>Compiles the project using TypeScript and generates aliases as configured in `tsconfig.json`.</td>
  </tr>
  <tr>
    <td>`npm run services:build`</td>
    <td>Builds Docker services.</td>
  </tr>
  <tr>
    <td>`npm run services:install`</td>
    <td>Installs dependencies within the Docker container.</td>
  </tr>
  <tr>
    <td>`npm run services:up`</td>
    <td>Starts Docker services.</td>
  </tr>
  <tr>
    <td>`npm run services:stop`</td>
    <td>Stops Docker services.</td>
  </tr>
  <tr>
    <td>`npm run services:down`</td>
    <td>Removes Docker containers.</td>
  </tr>
  <tr>
    <td>`npm run services:test`</td>
    <td>Runs tests within the Docker container.</td>
  </tr>
  <tr>
    <td>`npm start`</td>
    <td>Compiles the project and starts the server.</td>
  </tr>
  <tr>
    <td>`npm run start:dev`</td>
    <td>Starts the server in development mode with hot reload and debug.</td>
  </tr>
  <tr>
    <td>`npm test`</td>
    <td>Runs tests using Jest.</td>
  </tr>
  <tr>
    <td>`npm run test:w`</td>
    <td>Runs tests in continuous watch mode.</td>
  </tr>
  <tr>
    <td>`npm run test:c`</td>
    <td>Runs tests with coverage.</td>
  </tr>
  <tr>
    <td>`npm run test:e2e`</td>
    <td>Runs end-to-end tests.</td>
  </tr>
  <tr>
    <td>`npm run prepare`</td>
    <td>Automatically executed by Husky before each commit.</td>
  </tr>
  <tr>
    <td>`npm run lint`</td>
    <td>Runs ESLint to check and fix code style issues.</td>
  </tr>
  <tr>
    <td>`npm run format`</td>
    <td>Formats TypeScript files using Prettier.</td>
  </tr>
</table>


## Running the Server
 
> To run the server, it is `required` to have `Docker` and `Docker Compose` installed on your machine.

1. Initialize container and install dependencies

```bash
$ npm run services:install
```

2. Run the application

```bash
$ npm run services:up
```

## Routes

> All routes provided by the `API`.

### User Routes

<table style="width: 100%">
  <tr>
    <th style="width: 10%">Method</th>
    <th style="width: 30%">Route</th>
    <th style="width: 60%">Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/users</td>
    <td>Create user</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users/me</td>
    <td>Show user information</td>
  </tr>
</table>


### Authentication Routes

<table style="width: 100%">
  <tr>
    <th style="width: 10%">Method</th>
    <th style="width: 30%">Route</th>
    <th style="width: 60%">Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth</td>
    <td>Authenticate</td>
  </tr>
</table>

### Scenarios Routes

<table style="width: 100%">
  <tr>
    <th style="width: 10%">Method</th>
    <th style="width: 30%">Route</th>
    <th style="width: 60%">Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/scenarios</td>
    <td>Create scenario</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/scenarios</td>
    <td>Return list of scenarios</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/scenarios/:id</td>
    <td>Return scenario by ID</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/scenarios/:id</td>
    <td>Update scenario</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/scenarios/:id</td>
    <td>Delete scenario</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/scenarios/deleteMany</td>
    <td>Delete multiple scenarios</td>
  </tr>
</table>


### Simulations Routes

<table style="width: 100%">
  <tr>
    <th style="width: 10%">Method</th>
    <th style="width: 30%">Route</th>
    <th style="width: 60%">Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/simulations</td>
    <td>Create simulation</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/simulations</td>
    <td>Return list of simulations</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/simulations/:id</td>
    <td>Return simulation by ID</td>
  </tr>
</table>

## Directory structure

> This directory structure provides a clear organization of the project, separating API logic, middleware, services, shared files, and more, facilitating development and maintenance.

### Overview

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controllers/
│  │  │  ├─ create-user.controller.ts
│  │  │  ├─ index.ts
│  │  │  └─ show-user.controller.ts
│  │  ├─ dtos/
│  │  │  ├─ create-user.dto.ts
│  │  │  └─ index.ts
│  │  ├─ models
│  │  │  ├─ index.ts
│  │  │  ├─ user.model.spec.ts
│  │  │  └─ user.model.ts
│  │  ├─ routes
│  │  │  └─ index.ts
│  │  └─ usecases
│  │     ├─ create/
│  │     │  ├─ create-user.usecase.spec.ts
│  │     │  └─ create-user.usercase.ts
│  │     ├─ login/
│  │     │  └─ login-user.usercase.ts
│  │     ├─ show/
│  │     │  ├─ show-user.usecase.spec.ts
│  │     │  └─ show-user.usercase.ts
│  │     └─ index.ts
│  │  
│  └─ index.ts
├─ middlewares/
├─ services/
│  ├─ aws/
│  ├─ database/
│  ├─ jwt/
│  ├─ logger/
│  ├─ passport/
│  ├─ scheduler/
│  ├─ vault/
│  └─ winston/
├─ shared/
│  ├─ index.js/
├─ types/
├─ app.ts
└─ server.ts
```

### Description

- **src/**
  - **api/**: This folder contains all the logic related to API endpoints. Each subfolder represents an entity or resource of the API, such as users, authentication, scenarios, and simulations.
    - **user/**: This subfolder contains files related to users.
      - **controllers/**: Responsible for handling HTTP requests related to users, such as creating a user or showing user information.
      - **dtos/**: Data Transfer Objects (DTOs) used to validate and structure data sent in user-related requests.
      - **models/**: Contains the user model used to interact with the MongoDB database.
      - **routes/**: Defines routes related to users that will be registered in the Express Router.
      - **usecases/**: Contains use cases related to users, such as creating, showing, and authenticating users.
  - **middlewares/**: Contains middlewares used by the application, such as request body validation, authentication, and route adaptation.
  - **services/**: This folder contains modules for specific services, such as integration with AWS, database management, JWT authentication, among others.
  - **shared/**: Contains shared files that can be used across the application, such as utility functions or shared configurations.
  - **types/**: Defines TypeScript types that can be used throughout the application.
  - **app.ts**: Main file of the application where Express is configured and routes are registered.
  - **server.ts**: Server initialization file where the Express application is instantiated and listens on a specific port.
