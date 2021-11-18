# Instructions

1 - Create an .env file based on the .env.example file and inform the database URI (MongoDB)

2. If you want to run the tests, configure the .env.test file with the test database URI

3. Use yarn or npm install to install project dependencies

### Commands to run

`yarn start` to start the server
`yarn test` to run the tests

### Documentation

It is possible to access the Swagger Documentation using the /api-docs route

## Backend Challenge

The project is a simple challenge to test your skills in building APIs using the Node.js framework.

### Submission

- [x] Read the description, requirements, and the others instructions

### What to do

- Create a simple API to manage the system of posts (CRUD).

**This API should allow to:**

| Method | Name           | Route          |
| ------ | -------------- | -------------- |
| POST   | Create Post    | /api/posts     |
| GET    | Listing Posts  | /api/posts     |
| GET    | Get Post By ID | /api/posts/:id |
| PUT    | Edit Post      | /api/posts/:id |
| DELETE | Delete Post    | /api/posts/:id |

**The post must have the following fields:**

| Field | Type     |
| ----- | -------- |
| id    | UUID     |
| title | string   |
| body  | string   |
| tags  | string[] |

### Requirements

- [x] All API responses must be in JSON format.
- [x] Add pagination on the API for the listing of the posts
- [x] Provide the unit testing for all routes using Mocha and Chai or your preferred testing framework.
- [x] Provide documentation for all routes, we preferer using Swagger API, but you can using README for documentation.
- [x] Provide a README file with usage instructions (how to the runs, considerations, etc...).
- [x] Use naming written as camelCase by convention.

#### - **The folders structures of the project should be following the example below.**

```sh
├── src
│   ├── controllers
│   │   └── posts
│   ├── helpers
│   │   └── utils.js
│   ├── models
│   │   └── post.js
│   ├── routes
│   │   └── api
│   │       ├── posts.js
│   │       └── index.js
│   └── app.js
├── test
│   └── posts
├── .editorconfig
├── .gitignore
├── package.json
└── readme.md
```

#### Any routes should process the response in the controllers, no use function directly in the routes.

- See example below

![basic structure](https://i.imgur.com/lyRSYj8.png)

### Data Persistence

- [x] You will need to persist the data in some way, maybe in memory.
- [x] You don't need to use any external data persistence (database, cache, etc.), and the easier it is for us to run it, is better.

### Evaluation

- [x] Architecture
- [x] Automated tests
- [x] Functionalities of the APIs
- [x] Programming good practices
- [x] Project organization
- [x] Structure componentization
- [x] Clean code with camelcase pattern

### Bonus Level Up

- [x] Authenticated the routes using JWT
- [x] Process and validate the data that the API receives before creating the post.
- [x] Using MongoDB for storage data
- [x] Using Swagger API documentation
